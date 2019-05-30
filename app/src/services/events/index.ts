import uuidv4 from 'uuid/v4';
import {
  getLocalItem,
  setLocalItem,
  getSessionItem,
  setSessionItem,
} from '../../utils/storage';
import { Api } from '../api';

import { EventStore } from './store';
import { EventSubmitter } from './submitter';
import { AppEvent } from './definitions';


interface EventContext {
  deviceId: string;
  sessionId: string;
  instanceId: string;
}

interface EventData {
  name: string;
  payload?: {};
}

export interface HydratedEvent {
  name: string;
  payload: { context: EventContext };
  occurredAt: Date;
}


/**
 * An EventService manages and exposes functionality to track events within the
 * app and submit them to the server.
 */
export class EventService {

  private store: EventStore<HydratedEvent>;
  private submitter: EventSubmitter<HydratedEvent>;
  private context?: EventContext;

  public constructor(api: Api) {
    this.store = new EventStore();
    this.submitter = new EventSubmitter(api, this.store);
  }

  public track<E extends AppEvent>(name: E['name'], payload: E['payload'] = {}): void {
    this.store.add(this.hydrate({ name, payload }));
  }

  /**
   * Hydrate event data with global context and timestamp.
   */
  private hydrate(data: EventData): HydratedEvent {
    const payload = data.payload || {};
    const context = this.getContext();

    return {
      name: data.name,
      payload: Object.assign({}, payload, { context }),
      occurredAt: new Date(),
    };
  }

  /**
   * Get / or generate the global context which will be added to all events.
   */
  private getContext(): EventContext {
    if (this.context) return this.context;

    let deviceId = getLocalItem<string>('deviceId');
    if (!deviceId) {
      deviceId = uuidv4();
      setLocalItem('deviceId', deviceId);
    }

    let sessionId = getSessionItem<string>('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      setSessionItem('sessionId', sessionId);
    }

    this.context = {
      deviceId,
      sessionId,
      instanceId: uuidv4(),
    };

    return this.context;
  }
}
