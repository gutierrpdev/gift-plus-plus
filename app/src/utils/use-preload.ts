import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { getLogger } from './logging';
import { assertNever } from './helpers';


const logger = getLogger('use-preload');


interface PreloadState {
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


/**
 *
 */
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
      if (progress < 100) allDone = false;
    });

    const status = (state.status === 'running' && allDone) ? 'done' : state.status;

    return { ...state, status, urlProgress: state.urlProgress.set(action.url, 100) };
  }

  if (action.kind === 'url-error') {
    return { ...state, status: 'error' };
  }

  return assertNever(action);
}

/**
 *
 */
export function usePreload(urls: string[]) {
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
            ? Math.round(progressEvent.loaded / progressEvent.total * 100)
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
 *
 */
export function totalProgress(state: PreloadState): number {
  const urlCount = state.urlProgress.size;
  if (urlCount === 0) return 100;

  let summedProgress = 0;
  state.urlProgress.forEach((progress) => summedProgress += progress);

  return Math.round(summedProgress / urlCount);
}
