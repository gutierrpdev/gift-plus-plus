import uuidv4 from 'uuid/v4';
import { getLocalItem, setLocalItem, getSessionItem, setSessionItem } from '../../utils/storage';
import { AppEvent } from '../../domain';
import { Api } from '../api';

import { EventStore } from './store';
import { EventSubmitter } from './submitter';


interface EventData {
  name: string;
  payload?: {};
}

interface EventContext {
  deviceId: string;
  sessionId: string;
  instanceId: string;
}


/**
 * An EventService manages and exposes functionality to track events within the
 * app and submit them to the server.
 */
export class EventService {

  private store: EventStore<AppEvent>;
  private submitter: EventSubmitter<AppEvent>;
  private context?: EventContext;

  public constructor(api: Api) {
    this.store = new EventStore<AppEvent>();
    this.submitter = new EventSubmitter(api, this.store);
  }

  public track(data: EventData): void {
    this.store.add(this.hydrate(data));
  }


  /**
   * Hydrate event data with global context and timestamp.
   */
  private hydrate(data: EventData): AppEvent {
    const payload = data.payload || {};
    (payload as { context: EventContext }).context = this.getContext();

    return {
      name: data.name,
      payload,
      occurredAt: new Date(),
    };
  }

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
