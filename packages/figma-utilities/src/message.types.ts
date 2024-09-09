import type { DesignTokens } from 'style-dictionary/types';
import type { Credentials } from './credentials';
export enum MessageType {
  UIIsReady = 'ui-is-ready',
  CloseUI = 'close-ui',
  SyncVariables = 'sync-variables',
  SetLastSyncedAt = 'set-last-synced-at',
  SetCredentials = 'set-credentials',
  GetCredentials = 'get-credentials',
  GetDesignTokens = 'get-design-tokens',
  DeleteCredentials = 'delete-credentials',
  SetProjectId = 'set-project-id',
  GetProjectId = 'get-project-id',
  GetConfig = 'get-config',
  Connect = 'connect',
  LinkProject = 'link-project',
  GetLinkedProject = 'get-linked-project',
  OpenLinkProject = 'open-link-project',
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
export type CloseUIRequest = AsyncMessage<MessageType.CloseUI>;
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

export type SetLastSyncedAtRequest = AsyncMessage<
  MessageType.SetLastSyncedAt,
  {
    lastSyncedAt: number;
  }
>;

export type OpenLinkProjectRequest = AsyncMessage<MessageType.OpenLinkProject>;

export type LinkProjectRequest = AsyncMessage<
  MessageType.LinkProject,
  {
    id: string;
    name: string;
  }
>;

export type GetLinkedProjectRequest =
  AsyncMessage<MessageType.GetLinkedProject>;

export type GetLinkedProjectResponse = AsyncMessage<
  MessageType.GetLinkedProject,
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

export type GetCredentialsRequest = AsyncMessage<MessageType.GetCredentials>;
export type SetCredentialsRequest = AsyncMessage<
  MessageType.SetCredentials,
  {
    credentials: Credentials;
  }
>;
export type DeleteCredentialsRequest =
  AsyncMessage<MessageType.DeleteCredentials>;

export type GetCredentialsResponse = AsyncMessage<
  MessageType.GetCredentials,
  {
    credentials: Credentials | null;
  }
>;

export type GetDesignTokensRequest = AsyncMessage<MessageType.GetDesignTokens>;

export type GetDesignTokensResponse = AsyncMessage<
  MessageType.GetDesignTokens,
  {
    designTokens: DesignTokens;
  }
>;

export type GetProjectIdRequest = AsyncMessage<MessageType.GetProjectId>;

export type GetProjectIdResponse = AsyncMessage<
  MessageType.GetProjectId,
  {
    projectId: string | null;
  }
>;

export type SetProjectIdRequest = AsyncMessage<
  MessageType.SetProjectId,
  {
    projectId: string;
  }
>;

export type GetConfigRequest = AsyncMessage<MessageType.GetConfig>;

export type GetConfigResponse = AsyncMessage<
  MessageType.GetConfig,
  {
    fileName: string;
  }
>;

export type AsyncMessageRequests =
  | UIIsReadyRequest
  | CloseUIRequest
  | SyncVariablesRequest
  | SetLastSyncedAtRequest
  | OpenLinkProjectRequest
  | LinkProjectRequest
  | GetLinkedProjectRequest
  | ConnectRequest
  | GetCredentialsRequest
  | SetCredentialsRequest
  | DeleteCredentialsRequest
  | GetDesignTokensRequest
  | GetProjectIdRequest
  | SetProjectIdRequest
  | GetConfigRequest;

export type AsyncMessageResponses =
  | ConnectResponse
  | GetCredentialsResponse
  | GetDesignTokensResponse
  | GetProjectIdResponse
  | GetLinkedProjectResponse
  | GetConfigResponse
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
