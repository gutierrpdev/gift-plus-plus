import { useEffect, useReducer, useState } from 'react';
import { getLogger } from '../utils/logging';
import { assertNever } from '../utils/helpers';

import { InProgressGift, LocalFile } from '../domain';
import {
  CreatePreparedUploadResponse,
  CreateGiftRequest,
  CreateGiftResponse,
} from '../common/api-schema';

import { api } from './index';
import { AssetUploader } from './asset-uploader';

const logger = getLogger('use-gift-saver');


/**
 * Exposed interface for usegiftSaver
 */
export type GiftSaverState =
  | { kind: 'invalid-gift' }
  | { kind: 'uploading-assets', progress: number }
  | { kind: 'uploading-assets-error', retry: () => void }
  | { kind: 'saving-gift' }
  | { kind: 'saving-gift-error', retry: () => void }
  | { kind: 'done', gift: Gift }
;


// Helpful, shorter aliases for API types
type PreparedUpload = CreatePreparedUploadResponse;
type GiftData = CreateGiftRequest;
type Gift = CreateGiftResponse;


type AssetUploadState =
  | { kind: 'running', uploader: AssetUploader, progress: number }
  | { kind: 'failure' }
  | { kind: 'success', upload: PreparedUpload }
;

type State =
  | { kind: 'invalid-gift' }
  | { kind: 'ready', localAssets: LocalFile[] }
  | { kind: 'uploading-assets-running', uploadState: Map<LocalFile, AssetUploadState> }
  | { kind: 'uploading-assets-failure', uploadState: Map<LocalFile, AssetUploadState> }
  | { kind: 'uploading-assets-success', uploads: Map<LocalFile, PreparedUpload> }
  | { kind: 'saving-gift-running', giftData: GiftData }
  | { kind: 'saving-gift-failure', giftData: GiftData }
  | { kind: 'saving-gift-success', gift: Gift }
;

type Action =
  | { kind: 'asset-uploads-started', uploadState: Map<LocalFile, AssetUploadState> }
  | { kind: 'upload-progress', file: LocalFile, progress: number }
  | { kind: 'upload-done', file: LocalFile, upload: PreparedUpload }
  | { kind: 'upload-error', file: LocalFile }
  | { kind: 'gift-saving-started', giftData: GiftData }
  | { kind: 'gift-saving-done', gift: Gift }
  | { kind: 'gift-saving-error' }
;


/**
 * Create a fresh State based on the provided gift.
 */
function mkState(gift: InProgressGift): State {
  if (!gift.recipientGreeting) { // TODO: Better this
    return { kind: 'invalid-gift' };
  }

  // Extract the assets we need to upload from the gift
  const localAssets: LocalFile[] = [gift.recipientGreeting];
  gift.parts.forEach((part) => {
    localAssets.push(part.photo);
    localAssets.push(part.note);
  });

  return { kind: 'ready', localAssets };
}



function reducer(state: State, action: Action): State {
  logger.debug('Action', state, action);

  if (action.kind === 'asset-uploads-started') {
    return { kind: 'uploading-assets-running', uploadState: action.uploadState };
  }


  if (action.kind === 'upload-progress') {
    if (state.kind !== 'uploading-assets-running') return state;

    const currentUploadState = state.uploadState.get(action.file);
    if (!currentUploadState || currentUploadState.kind !== 'running') return state;

    state.uploadState.set(action.file, { ...currentUploadState, progress: action.progress });
    return { ...state };
  }

  // In the case of a successful upload, we mark that upload as successful and
  // check whether all uploads have now completed successfully. If so we
  // transition to the uploading-assets-success state. If not we remain in the
  // current state (either 'uploading-assets-running' or
  // 'uploading-assets-failure').
  if (action.kind === 'upload-done') {
    if (state.kind !== 'uploading-assets-running' && state.kind !== 'uploading-assets-failure') {
      return state;
    }

    state.uploadState.set(action.file, { kind: 'success', upload: action.upload });

    const completeUploads = new Map<LocalFile, PreparedUpload>();
    state.uploadState.forEach((uploadState, file) => {
      if (uploadState.kind === 'success') {
        completeUploads.set(file, uploadState.upload);
      }
    });

    if (completeUploads.size === state.uploadState.size) {
      return { kind: 'uploading-assets-success', uploads: completeUploads };
    }

    return { ...state };
  }

  // In the case of an error for a single asset, we mark the state as failed --
  // but allow running uploads to continue.
  if (action.kind === 'upload-error') {
    if (state.kind !== 'uploading-assets-running' && state.kind !== 'uploading-assets-failure') {
      return state;
    }

    state.uploadState.set(action.file, { kind: 'failure' });
    return { ...state, kind: 'uploading-assets-failure' };
  }

  // Handle actions corresponding to posting the new gift to the API
  if (action.kind === 'gift-saving-started') {
    return { kind: 'saving-gift-running', giftData: action.giftData };
  }
  if (action.kind === 'gift-saving-done') {
    return { kind: 'saving-gift-success', gift: action.gift };
  }
  if (action.kind === 'gift-saving-error') {
    if (state.kind !== 'saving-gift-running') return state;
    return { ...state, kind: 'saving-gift-failure' };
  }

  return assertNever(action);
}



/**
 * TODO: This info
 */
export function useGiftSaver(gift: InProgressGift): GiftSaverState {
  const [command, setCommand] = useState<null | 'retry'>(null);
  const [state, dispatch] = useReducer(reducer, gift, mkState);

  useEffect(() => {
    // Attempt to upload assets when initial gift is ready
    if (state.kind === 'ready') {
      const uploadState = new Map<LocalFile, AssetUploadState>();

      state.localAssets.forEach((file) => {
        const uploader = new AssetUploader({
          file,
          onProgress: (progress) => dispatch({ kind: 'upload-progress', file, progress }),
          onComplete: (upload) => dispatch({ kind: 'upload-done', file, upload }),
          onError: (err) => {
            logger.error(err, 'AssetUploadError');
            dispatch({ kind: 'upload-error', file });
          },
        });
        uploader.run();
        uploadState.set(file, { kind: 'running', uploader, progress: 0 });
      });
      dispatch({ kind: 'asset-uploads-started', uploadState });
    }

    // Attempt to save the gift when assets are complete
    if (state.kind === 'uploading-assets-success') {
      // Substitute the uploaded asset files into our gift data for posting
      const giftData: GiftData = {
        id: gift.id,
        museumId: gift.museumId,
        recipientName: gift.recipientName!,
        recipientGreeting: state.uploads.get(gift.recipientGreeting!)!.fileName,
        senderName: gift.senderName!,
        parts: gift.parts.map((part) => ({
          photo: state.uploads.get(part.photo)!.fileName,
          note: state.uploads.get(part.note)!.fileName,
          clue: part.clue,
        })),
      };

      api.createGift(giftData).then((apiResult) => {
        if (apiResult.kind === 'ok') {
          dispatch({ kind: 'gift-saving-done', gift: apiResult.data });
        } else {
          dispatch({ kind: 'gift-saving-error' });
        }
      });
      dispatch({ kind: 'gift-saving-started', giftData });
    }

  }, [state.kind]);


  // Handle retry being called
  useEffect(() => {
    if (command === 'retry') {

      // Retry asset-upload
      if (state.kind === 'uploading-assets-failure') {
        state.uploadState.forEach((us, file) => {
          const uploader = new AssetUploader({
            file,
            onProgress: (progress) => dispatch({ kind: 'upload-progress', file, progress }),
            onComplete: (upload) => dispatch({ kind: 'upload-done', file, upload }),
            onError: (err) => {
              logger.error(err, 'AssetUploadError');
              dispatch({ kind: 'upload-error', file });
            },
          });
          uploader.run();
          uploadState.set(file, { kind: 'running', uploader, progress: 0 });
        });
        dispatch({ kind: 'asset-uploads-started', uploadState });
      }


      // Retry gift-saving to API
      if (state.kind === 'saving-gift-failure') {
        const giftData = state.giftData;
        api.createGift(giftData).then((apiResult) => {
          if (apiResult.kind === 'ok') {
            dispatch({ kind: 'gift-saving-done', gift: apiResult.data });
          } else {
            dispatch({ kind: 'gift-saving-error' });
          }
        });
        dispatch({ kind: 'gift-saving-started', giftData });
      }

      setCommand(null);
    }
  }, [command, state.kind]);


  // Derive the exposed GiftSaverState from our internal state.
  if (state.kind === 'invalid-gift') {
    return { kind: 'invalid-gift' };
  }
  if (state.kind === 'ready') {
    return { kind: 'uploading-assets', progress: 0 };
  }
  if (state.kind === 'uploading-assets-running') {
    return { kind: 'uploading-assets', progress: 0 };
  }
  if (state.kind === 'uploading-assets-success') {
    return { kind: 'uploading-assets', progress: 100 };
  }
  if (state.kind === 'uploading-assets-failure') {
    return { kind: 'uploading-assets-error', retry: () => setCommand('retry') };
  }
  if (state.kind === 'saving-gift-running') {
    return { kind: 'saving-gift' };
  }
  if (state.kind === 'saving-gift-success') {
    return { kind: 'done', gift: state.gift };
  }
  if (state.kind === 'saving-gift-failure') {
    return { kind: 'saving-gift-error', retry: () => setCommand('retry') };
  }

  return assertNever(state);
}
