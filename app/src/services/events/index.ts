// tslint:disable max-classes-per-file

import { Api } from '../api';
import { assertNever } from '../../utils/helpers';
import { getLogger } from '../../utils/logging';

const logger = getLogger('events');


interface AppEvent {
  name: string;
  payload: {};
  occurredAt: Date;
}

interface EventData {
  name: string;
  payload: {};
}


/**
 * An EventService manages and exposes functionality to track events within the
 * app and submit them to the server.
 */
export class EventService {

  private store: EventStore<AppEvent>;
  private submitter: EventSubmitter<AppEvent>;

  public constructor(api: Api) {
    this.store = new EventStore<AppEvent>();
    this.submitter = new EventSubmitter(api, this.store);
  }

  public track({ name, payload }: EventData): void {
    console.log({ name, payload });
    this.store.add({ name, payload, occurredAt: new Date() });
  }
}


/**
 * An EventStore is responsible for keeping track of events as they occur in the
 * app, till they can be sent to the server by an EventSubmitter.
 *
 * For now our event store is just an in-memory object. For the sake of sanity
 * we implement a max size of 1000 before we start dropping old items.
 *
 * We may switch this out for something like localStorage or PouchDB to minimize
 * the loss of events in the future.
 */
class EventStore<T> {

  private static MAX_SIZE = 1000;
  private store: T[] = [];

  public add(item: T) {
    this.store.push(item);

    if (this.store.length > EventStore.MAX_SIZE) {
      const excess = this.store.length - EventStore.MAX_SIZE;
      this.store.splice(0, excess);
    }
  }

  public removeBatch(batchSize: number): T[] {
    return this.store.splice(0, batchSize);
  }

  public reinsertBatch(batch: T[]): void {
    this.store.splice(0, 0, ...batch);
  }
}


/**
 * An EventSubmitter is responsible retrieving events from an EventStore and
 * submitting them to the server whenever possible.
 *
 * TODO: Timeouts / Cancellation
 */
class EventSubmitter<T extends AppEvent> {

  private static BATCH_SIZE = 50;
  private static POLL_INTERVAL_MS = 1000;

  private api: Api;
  private store: EventStore<T>;

  public constructor(api: Api, store: EventStore<T>) {
    this.api = api;
    this.store = store;
    this.runPoller();
  }

  private runPoller(): void {
    this.process()
      .catch((err) => {
        logger.error(err, 'EventSubmitterFailed');
      })
      .then(() => {
        setTimeout(
          () => this.runPoller(),
          EventSubmitter.POLL_INTERVAL_MS,
        );
      });
  }

  /**
   * Attempt to get a batch of pending events, send them to the server, and
   * delete them.
   *
   * @returns The number of events successfully processed
   */
  private async process(): Promise<number> {
    const events = this.store.removeBatch(EventSubmitter.BATCH_SIZE);
    if (events.length === 0) return 0;

    const result = await this.api.submitEvents(events);

    // All good?  We're done!
    if (result.kind === 'ok') return events.length;

    // We should never get a parse-error, but if we do it was still a success.
    if (result.kind === 'parse-error') return events.length;

    // Some networky problem?  Put the events back and try again.
    if (result.kind === 'fetch-error') {
      this.store.reinsertBatch(events);
      throw (result.error);
    }

    // Server say's no?  Let's dig further.
    if (result.kind === 'http-error') {
      const status = result.response.status;

      // Server errors _should_ be temporary (we really, really hope)
      if (status >= 500) {
        this.store.reinsertBatch(events);
        throw new Error(`RetryableServerError [${status}]`);
      }

      // Any other error could indicate some problem with our data, let's just
      // abandon this batch...
      throw new Error(`UnrecoverableServerError [${status}]`);
    }

    return assertNever(result);
  }
}
