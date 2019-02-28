import uuid from 'uuid/v4';
import { useEffect, useState } from 'react';
import { getLogger } from './logging';

/**
 *  Simple Typescript helper to ensure we haven't accidentally missed possible
 *  cases while doing switch statements / fall-through if statements etc.
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}


/**
 * Generate a 7 character fairly unique id.
 */
function mkShortId(): string {
  return uuid().slice(0, 7);
}


const asyncLogger = getLogger('async-progress');

/**
 * Representation of a Promise state machine.
 */
export type AsyncProgress<ResultType = any, ErrorType = any> =
  | { kind: 'running', id: string }
  | { kind: 'success', id: string, result: ResultType }
  | { kind: 'failure', id: string, reason: ErrorType };


/**
 * Helper React Hook to wrap around the process of running an async function and
 * switching based on whether it's running, has succeeded, or has failed.
 *
 * @param promiseProducer - A function which can be called to kick-off the async
 *                          process and provide the resulting Promise.
 * @param deps - As for Reacts useEffect, any dependencies for which changes
 *               should cause the async to be re-executed.
 */
export function useAsync<ResultType, ErrorType>(
  promiseProducer: () => Promise<ResultType>,
  deps?: React.DependencyList,
): [AsyncProgress<ResultType, ErrorType | Error>] {
  const [state, setState] = useState<AsyncProgress<ResultType, ErrorType | Error>>(
    { kind: 'running', id: mkShortId() },
  );

  useEffect(
    () => {
      try {
        promiseProducer()
          .then((result) => {
            setState({ kind: 'success', id: state.id, result });
          })
          .catch((reason: ErrorType) => {
            setState({ kind: 'failure', id: state.id, reason });
          });

        if (state.kind !== 'running') {
          setState({ kind: 'running', id: state.id });
        }
      } catch (err) {
        setState({ kind: 'failure', id: state.id, reason: err as Error });
      }
    },
    deps,
  );

  asyncLogger.debug(`StateChange:${state.id}`, state);
  return [state];
}
