import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { getLogger } from './logging';
import { assertNever } from './helpers';


const logger = getLogger('use-preload');


/**
 * PreloadState represents the current download progress of multiple urls.
 *
 * The download progress for any given url is always represented as a number in
 * the range [0, 1].
 *
 * urlProgress is a map from urls to their respective download progress.
 */
export interface PreloadState {
  status: 'running' | 'done' | 'error';
  urlProgress: Map<string, number>;
}


type PreloadAction =
  | { kind: 'url-progress', url: string, progress: number }
  | { kind: 'url-done', url: string }
  | { kind: 'url-error', url: string, error: any }
  | { kind: 'reset', urls: string[] }
;


/**
 * Create a fresh new PreloadState based on the provided urls.
 */
function mkPreloadState(urls: string[]): PreloadState {
  const urlMap = new Map<string, number>();
  urls.forEach((url) => urlMap.set(url, 0));

  return {
    status: (urls.length === 0) ? 'done' : 'running',
    urlProgress: urlMap,
  };
}


function preloadReducer(state: PreloadState, action: PreloadAction): PreloadState {
  logger.debug('PreloadAction', state, action);

  if (action.kind === 'reset') return mkPreloadState(action.urls);

  if (action.kind === 'url-progress') {
    return { ...state, urlProgress: state.urlProgress.set(action.url, action.progress) };
  }

  if (action.kind === 'url-done') {
    let allDone = true;

    state.urlProgress.forEach((progress, url) => {
      if (url === action.url) return;
      if (progress < 1) allDone = false;
    });

    const status = (state.status === 'running' && allDone) ? 'done' : state.status;

    return { ...state, status, urlProgress: state.urlProgress.set(action.url, 1) };
  }

  if (action.kind === 'url-error') {
    return { ...state, status: 'error' };
  }

  return assertNever(action);
}


/**
 * [React Hook] Given a collection of urls, this hook will run an effect which
 * downloads the given urls and provides the current progress via a
 * `PreloadState`.
 *
 * A new download effect will occur if the given `urls` change.
 *
 * NOTE: We don't implement any caching ourselves, preferring to rely on
 * appropriate cache headers in the responses and the browser's native caching
 * mechanisms.
 */
export function usePreload(urls: string[]): [PreloadState] {
  const [state, dispatch] = useReducer(preloadReducer, urls, mkPreloadState);

  // Web requests are expensive, so we only want to run when urls have actually
  // changed. Passing this to useEffect will ensure that's the case.
  const dependencyKey = JSON.stringify(urls.sort());

  useEffect(() => {
    dispatch({ kind: 'reset', urls });

    urls.forEach((url) => {
      axios.get(url, {
        onDownloadProgress: (progressEvent: ProgressEvent) => {
          logger.debug('progress', progressEvent);

          const progress = progressEvent.lengthComputable
            ? progressEvent.loaded / progressEvent.total
            : 0;

          dispatch({ kind: 'url-progress', url, progress });
        },
      }).then(() => {
        dispatch({ kind: 'url-done', url });
      }).catch((error: any) => {
        dispatch({ kind: 'url-error', url, error });
      });
    });

  }, [dependencyKey]);

  return [state];
}


/**
 * Determine the overall progress of a preload. Progress is represented as a
 * number in the range [0,1]
 *
 * NOTE: For now this assumes each file being preloaded is the same size.
 * TODO: Track the total size of each file for more accurate progress reporting.
 */
export function totalProgress(state: PreloadState): number {
  const urlCount = state.urlProgress.size;
  if (urlCount === 0) return 1;

  let summedProgress = 0;
  state.urlProgress.forEach((progress) => summedProgress += progress);

  return summedProgress / urlCount;
}
