import React, { useState, useReducer, useEffect } from 'react';
import MediaRecorderPolyfill from 'audio-recorder-polyfill';
import 'md-gum-polyfill';

// import { getLogger } from './logging';
// import { assertNever } from './helpers';

// const logger = getLogger('use-audio-recorder');
const MediaRecorder = window.MediaRecorder || MediaRecorderPolyfill;

// /**
//  * TODO: This is the external interface
//  */
// type AudioRecorderState =
//   | { kind: 'pending' }
//   | { kind: 'getting-user-media' }
//   | { kind: 'user-media-error', errorKind: 'not-compatible' | 'not-allowed' }
//   | { kind: 'recording' }
//   | { kind: 'audio-ready' }
//   | { kind: 'error' }


// /**
//  * TODO: This is the external interface
//  */
// type AudioRecorderAction =
//   | { kind: 'start' }
//   | { kind: 'stop' }
//   | { kind: 'reset' } // ??



// function reducer(state: AudioRecorderState, action: AudioRecorderAction): AudioRecorderState {
//   logger.debug('AudioRecorderAction', state, action);
//   return state;
// }

/**
 * TODO
 */
type Command = 'init' | 'start' | 'stop' | 'reset';


/**
 * TODO
 */
export const useAudioRecorder = () => {
  const [command, setCommand] = useState<Command>('init');

  // Command Handler
  useEffect(() => {
    if (command === 'start') {

    }
  }, [command]);

  // Cleanup
  useEffect(() => (() => {

  }), []);

  return {
    start: () => setCommand('start'),
    stop: () => setCommand('stop'),
    reset: () => setCommand('reset'),
  };
};


/**
 * TODO
 */
export const canUseAudioRecorder = () => !!navigator.mediaDevices.getUserMedia;
