import {
  on as defaultOn,
  emit as defaultEmit,
  once as defaultOnce,
} from '@create-figma-plugin/utilities';
import type { DesignTokens } from 'style-dictionary/types';
import type { Credentials } from './credentials';

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
        lastSyncedAt: number | null;
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
    'get-project': {
      request: undefined;
      response: undefined;
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
  console.log(`🔁 on ${name}`);
  return defaultOn(name, handler);
}

export function once<Name extends EventName>(
  name: Name,
  handler: ResponseHandler<Name>
) {
  console.log(`🔁 once ${name}`);
  return defaultOnce(name, handler);
}

export function emit<Name extends EventName>(
  name: Name,
  data: Event[Name]['response']
) {
  console.log(`🚀 emit ${name}`);
  return defaultEmit(name, data);
}

export async function request<Name extends EventName>(
  name: Name,
  data: Event[Name]['request']
) {
  console.log(`✈️ request ${name}`);
  const response = new Promise<Event[Name]['response']>((resolve, reject) => {
    console.log(`✈️ request 🚀 emit ${name}`);
    defaultEmit(name, data);

    console.log(`✈️ request ⏰ wait for ${name}`);
    defaultOn(name, resolve);

    // TODO: handle timeout to reject the promise
  });
  return response;
}

export async function handle<Name extends EventName>(
  name: Name,
  handler: (
    data: Event[Name]['request']
  ) => Promise<Event[Name]['response']> | Event[Name]['response']
): Promise<void> {
  const response = await new Promise<Event[Name]['response']>(
    (resolve, reject) => {
      console.log(`✈️ handle 🔁 on ${name}`);
      defaultOn(name, (data: Event[Name]['request']) => {
        console.log(`✈️ handle 🚀 emit ${name}`);
        resolve(handler(data));
      });

      // TODO: handle timeout to reject the promise
    }
  );

  return defaultEmit(name, response);
}
