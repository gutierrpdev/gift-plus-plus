import React, { useState, useRef, useEffect } from 'react';
import MediaRecorderPolyfill from 'audio-recorder-polyfill';
import 'md-gum-polyfill';

import { getLogger } from './logging';
import { assertNever } from './helpers';

const logger = getLogger('use-audio-recorder');
const MediaRecorder = window.MediaRecorder || MediaRecorderPolyfill;


/**
 * TODO: This is the external interface
 */
export type AudioRecorder =
  | { state: 'pending';  start: () => void; }
  | { state: 'preparing' }
  | { state: 'ready'; start: () => void; }
  | { state: 'recording'; stop: () => void; }
  | { state: 'processing' }
  | { state: 'audio-ready'; recordingUrl: string; disposeRecording: () => void; }
  | { state: 'error'; error: AudioRecorderError; reset: () => void; }
;

type AudioRecorderError =
  | 'not-compatible'
  | 'not-allowed'
  | 'recording-error'
;


// Internal State
type State =
  | { kind: 'pending' }
  | { kind: 'preparing' }
  | { kind: 'ready'; recorder: MediaRecorder }
  | { kind: 'recording'; recorder: MediaRecorder }
  | { kind: 'processing'; recorder: MediaRecorder }
  | { kind: 'audio-ready'; recorder: MediaRecorder; recordingUrl: string }
  | { kind: 'error'; recorder?: MediaRecorder; error: AudioRecorderError }
;


/**
 * TODO
 */
export const useAudioRecorder: () => AudioRecorder = () => {
  const [state, setState] = useState<State>({ kind: 'pending' });

  // Track the state in a mutable ref so we can use the current value when
  // cleaning up.
  const refState = useRef(state);
  refState.current = state;

  // Cleanup
  useEffect(() => (() => {
    const s = refState.current;
    if (s.kind === 'pending') return;
    if (s.kind === 'preparing') return;
    if (!s.recorder) return;
    s.recorder.stream.getTracks().forEach((track) => track.stop());
  }), []);


  if (state.kind === 'pending') {
    return {
      state: 'pending',
      start: () => {
        // Determine compatiblity
        if (!canUseAudioRecorder()) {
          setState({ kind: 'error',  error: 'not-compatible' });
          return;
        }

        setState({ kind: 'preparing' });

        // Prepare a media stream
        navigator.mediaDevices.getUserMedia(
          { audio: true, video: false },
        ).then(
          (stream) => {
            // Setup a new MediaRecorder
            const recorder = new MediaRecorder(stream);

            // Handle recording ready
            recorder.addEventListener('dataavailable', (e) => {
              const event = e as BlobEvent;
              const fileUrl = URL.createObjectURL(event.data);
              setState({ kind: 'audio-ready', recordingUrl: fileUrl, recorder });
            });

            // Handle error
            recorder.addEventListener('error', (e) => {
              const error = e as MediaRecorderErrorEvent;
              setState({ kind: 'error',  error: 'recording-error', recorder });
            });

            // Start recording
            try {
              recorder.start();
              setState({ kind: 'recording', recorder });
            } catch (e) {
              setState({ kind: 'error',  error: 'recording-error', recorder });
            }
          },
        ).catch(() => {
          setState({ kind: 'error',  error: 'not-allowed' });
        });
      },
    };
  }


  if (state.kind === 'preparing') {
    return { state: 'preparing' };
  }


  if (state.kind === 'ready') {
    return {
      state: 'ready',
      start: () => {
        const recorder = state.recorder;
        try {
          recorder.start();
          setState({ kind: 'recording', recorder });
        } catch (e) {
          setState({ kind: 'error',  error: 'recording-error', recorder });
        }
      },
    };
  }


  if (state.kind === 'recording') {
    return {
      state: 'recording',
      stop: () => {
        const recorder = state.recorder;
        try {
          recorder.stop();
          setState({ kind: 'processing', recorder });
        } catch (e) {
          setState({ kind: 'error',  error: 'recording-error', recorder });
        }
      },
    };
  }


  if (state.kind === 'processing') {
    return { state: 'processing' };
  }


  if (state.kind === 'audio-ready') {
    return {
      state: 'audio-ready',
      recordingUrl: state.recordingUrl,
      disposeRecording: () => {
        setState({ kind: 'ready', recorder: state.recorder });
        URL.revokeObjectURL(state.recordingUrl);
      },
    };
  }


  if (state.kind === 'error') {
    return {
      state: 'error',
      error: state.error,
      reset: () => {
        setState({ kind: 'pending' });
        if (state.recorder) {
          state.recorder.stream.getTracks().forEach((track) => track.stop());
        }
      },
    };
  }


  return assertNever(state);
};


/**
 * TODO
 */
export const canUseAudioRecorder = () => !!navigator.mediaDevices.getUserMedia;
