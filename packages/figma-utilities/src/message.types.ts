import type { DesignTokens } from 'style-dictionary/types';
import type { Credentials } from './credentials';
export enum MessageType {
  UIIsReady = 'ui-is-ready',
  SyncVariables = 'sync-variables',
  SetCredentials = 'set-credentials',
  DeleteCredentials = 'delete-credentials',
  Connect = 'connect',
  SetProject = 'set-project',
  GetProject = 'get-project',
  OpenProjectsUI = 'open-projects-ui',
}

export type AsyncMessage<
  Type extends MessageType,
  MessageResponse = unknown,
> = {
  type: Type;
} & MessageResponse;

export type PluginMessageEvent<
  Type extends MessageType,
  MessageResponse = unknown,
> = MessageEvent<{
  pluginMessage: {
    type: Type;
  } & MessageResponse;
}>;

export interface IncomingMessageEvent<Message = unknown> {
  data: {
    pluginMessage:
      | {
          id: string;
          message: Message;
        }
      | {
          id: string;
          error: unknown;
        };
  };
}

export type UIIsReadyRequest = AsyncMessage<MessageType.UIIsReady>;

export type SyncVariablesRequest = AsyncMessage<
  MessageType.SyncVariables,
  {
    variables: DesignTokens;
  }
>;

export type SyncVariablesResponse = AsyncMessage<
  MessageType.SyncVariables,
  {
    lastSyncedAt: number | null;
  }
>;

export type OpenLinkProjectRequest = AsyncMessage<MessageType.OpenProjectsUI>;

export type LinkProjectRequest = AsyncMessage<
  MessageType.SetProject,
  {
    id: string;
    name: string;
  }
>;

export type GetLinkedProjectRequest = AsyncMessage<MessageType.GetProject>;

export type GetLinkedProjectResponse = AsyncMessage<
  MessageType.GetProject,
  {
    project: {
      id: string;
      name: string;
    } | null;
  }
>;

export type ConnectRequest = AsyncMessage<MessageType.Connect>;
export type ConnectResponse = AsyncMessage<
  MessageType.Connect,
  {
    credentials: Credentials | null;
  }
>;

export type SetCredentialsRequest = AsyncMessage<
  MessageType.SetCredentials,
  {
    credentials: Credentials;
  }
>;
export type DeleteCredentialsRequest =
  AsyncMessage<MessageType.DeleteCredentials>;

export type AsyncMessageRequests =
  | UIIsReadyRequest
  | SyncVariablesRequest
  | OpenLinkProjectRequest
  | LinkProjectRequest
  | GetLinkedProjectRequest
  | ConnectRequest
  | SetCredentialsRequest
  | DeleteCredentialsRequest;

export type AsyncMessageResponses =
  | ConnectResponse
  | GetLinkedProjectResponse
  | SyncVariablesResponse;

export type AsyncMessageRequestsMap = {
  [K in MessageType]: Extract<AsyncMessageRequests, { type: K }>;
};
export type AsyncMessageResponsesMap = {
  [K in MessageType]: Extract<AsyncMessageResponses, { type: K }>;
};

// credits goes to https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
type IsTypeOnlyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj,
] extends ['type']
  ? true
  : false;

export type AsyncMessageChannelHandlers = {
  [K in MessageType]: (
    incoming: AsyncMessageRequestsMap[K]
  ) => Promise<
    IsTypeOnlyObject<AsyncMessageResponsesMap[K]> extends true
      ? never
      : Omit<AsyncMessageResponsesMap[K], 'type'>
  >;
};
