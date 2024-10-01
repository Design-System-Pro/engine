import {
  on as defaultOn,
  emit as defaultEmit,
  once as defaultOnce,
} from '@create-figma-plugin/utilities';
import type { DesignTokens } from 'style-dictionary/types';
import type { Credentials } from './credentials';

const DEFAULT_EVENT_TIMEOUT = 10 * 1000; // 10 seconds

type RequestResponse = Record<
  string,
  {
    request: Record<string, unknown> | undefined;
    response: Record<string, unknown> | undefined;
  }
>;

type Implements<T, U extends T> = U;

type Event = Implements<
  RequestResponse,
  {
    'ui-is-ready': {
      request: undefined;
      response: undefined;
    };

    connect: {
      request: undefined;
      response: { credentials: Credentials | null };
    };

    'sync-variables': {
      request: { variables: DesignTokens };
      response: {
        lastSyncedAt: string | null;
      };
    };

    'set-credentials': {
      request: undefined;
      response: { credentials: Credentials | null };
    };

    'set-project': {
      request: undefined;
      response: { id: string; name: string };
    };

    'open-projects-ui': {
      request: undefined;
      response: undefined;
    };
  }
>;

type EventName = keyof Event;

export type ResponseHandler<Name extends EventName> = (
  data: Event[Name]['response']
) => void;

export function on<Name extends EventName>(
  name: Name,
  handler: ResponseHandler<Name>
) {
  console.log(`[on] waiting for event '${name}'`);
  const cancelOn = defaultOn(name, (data: Event[Name]['response']) => {
    handler(data);
  });

  return () => {
    console.log(`[on] cancelling event '${name}'`);
    cancelOn();
  };
}

export function once<Name extends EventName>(
  name: Name,
  handler: ResponseHandler<Name>
) {
  console.log(`[once] waiting for event '${name}'`);
  const cancelOnce = defaultOnce(name, (data: Event[Name]['response']) => {
    handler(data);
  });

  return () => {
    console.log(`[once] cancelling event '${name}'`);
    cancelOnce();
  };
}

export function emit<Name extends EventName>(
  name: Name,
  data: Event[Name]['response']
) {
  console.log(`[emit] sending event '${name}'`);
  return defaultEmit(name, data);
}

export function request<Name extends EventName>(
  name: Name,
  data: Event[Name]['request'],
  handler: ResponseHandler<Name>,
  options: { timeout: number; onCanceled?: () => void } = {
    timeout: DEFAULT_EVENT_TIMEOUT,
  }
) {
  console.log(`[request] requesting event '${name}'`);
  defaultEmit(name, data);

  console.log(`[request] waiting for event '${name}'`);
  const cancelOnce = defaultOnce(name, handler);

  const timeout = setTimeout(() => {
    console.log(`[request] event '${name}' timeout`);
    cancelOnce();
    options.onCanceled?.();
  }, options.timeout);

  return () => {
    console.log(`[request] cancelling event '${name}'`);
    clearTimeout(timeout);
    cancelOnce();
    options.onCanceled?.();
  };
}

export function requestAsync<Name extends EventName>(
  name: Name,
  data: Event[Name]['request'],
  options: { timeout: number } = { timeout: DEFAULT_EVENT_TIMEOUT }
): Promise<Event[Name]['response']> {
  return new Promise((resolve, reject) => {
    request(name, data, resolve, {
      ...options,
      onCanceled: reject,
    });
  });
}

export function handle<Name extends EventName>(
  name: Name,
  handler: (
    data: Event[Name]['request']
  ) => Promise<Event[Name]['response']> | Event[Name]['response'],
  options: { timeout: number } = { timeout: DEFAULT_EVENT_TIMEOUT }
): () => void {
  console.log(`[handle] waiting for event '${name}'`);
  const cancelOnce = defaultOnce(name, (data: Event[Name]['request']) => {
    Promise.resolve(handler(data))
      .then((response) => {
        console.log(`[handle] responding to event '${name}'`);
        defaultEmit(name, response);
      })
      .catch(() => {
        console.error(`[handle] error handling event '${name}'`);
      });
  });

  const timeout = setTimeout(() => {
    console.log(`[handle] event '${name}' timeout`);
    cancelOnce();
  }, options.timeout);

  return () => {
    console.log(`[handle] canceling event '${name}'`);
    clearTimeout(timeout);
    cancelOnce();
  };
}
