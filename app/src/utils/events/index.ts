/**
 * Track the given event data. This should be called with one of the Events
 * exported from this module. E.g.
 *
 *     import { track, registrationAttemptedEvent } from '../utils/events';
 *
 *     track(registrationAttemptedEvent());
 *
 */
export function track( { name, payload }: {name: string, payload: {}} ) {
  const event = createAppEvent(name, payload);
  // tslint:disable-next-line no-console
  // console.log(event);
  // todo do something with the event
}

// Re-export all our event definitions
export * from './definitions';

function createAppEvent(name: string, payload = {}) {
  return {
    name,
    payload: hydrate(payload),
    occurredAt: new Date(),
  };
}

function hydrate(payload: {}) {
  return payload;
}
