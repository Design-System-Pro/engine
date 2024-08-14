import type { DesignTokens } from 'style-dictionary/types';
import type { Credentials } from './types/credentials';

export enum AsyncMessageTypes {
  SetCredentials = 'set-credentials',
  GetCredentials = 'get-credentials',
  GetDesignTokens = 'get-design-tokens',
  DeleteCredentials = 'delete-credentials',
  SetProjectId = 'set-project-id',
  GetProjectId = 'get-project-id',
  GetConfig = 'get-config',
}

export type AsyncMessage<
  MessageType extends AsyncMessageTypes,
  MessageResponse = unknown,
> = {
  type: MessageType;
} & MessageResponse;

export type PluginMessageEvent<
  MessageType extends AsyncMessageTypes,
  MessageResponse = unknown,
> = MessageEvent<{
  pluginMessage: {
    type: MessageType;
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

export type GetCredentialsRequest =
  AsyncMessage<AsyncMessageTypes.GetCredentials>;
export type SetCredentialsRequest = AsyncMessage<
  AsyncMessageTypes.SetCredentials,
  {
    credentials: Credentials;
  }
>;
export type DeleteCredentialsRequest =
  AsyncMessage<AsyncMessageTypes.DeleteCredentials>;

export type GetCredentialsResponse = AsyncMessage<
  AsyncMessageTypes.GetCredentials,
  {
    credentials: Credentials;
  }
>;

export type GetDesignTokensRequest =
  AsyncMessage<AsyncMessageTypes.GetDesignTokens>;

export type GetDesignTokensResponse = AsyncMessage<
  AsyncMessageTypes.GetDesignTokens,
  {
    designTokens: DesignTokens;
  }
>;

export type GetProjectIdRequest = AsyncMessage<AsyncMessageTypes.GetProjectId>;

export type GetProjectIdResponse = AsyncMessage<
  AsyncMessageTypes.GetProjectId,
  {
    projectId?: string;
  }
>;

export type SetProjectIdRequest = AsyncMessage<
  AsyncMessageTypes.SetProjectId,
  {
    projectId: string;
  }
>;

export type GetConfigRequest = AsyncMessage<AsyncMessageTypes.GetConfig>;

export type GetConfigResponse = AsyncMessage<
  AsyncMessageTypes.GetConfig,
  {
    fileName: string;
  }
>;

export type AsyncMessageRequests =
  | GetCredentialsRequest
  | SetCredentialsRequest
  | DeleteCredentialsRequest
  | GetDesignTokensRequest
  | GetProjectIdRequest
  | SetProjectIdRequest
  | GetConfigRequest;

export type AsyncMessageResponses =
  | GetCredentialsResponse
  | GetDesignTokensResponse
  | GetProjectIdResponse
  | GetConfigResponse;

export type AsyncMessageRequestsMap = {
  [K in AsyncMessageTypes]: Extract<AsyncMessageRequests, { type: K }>;
};
export type AsyncMessageResponsesMap = {
  [K in AsyncMessageTypes]: Extract<AsyncMessageResponses, { type: K }>;
};

// credits goes to https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
type IsTypeOnlyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj,
] extends ['type']
  ? true
  : false;

export type AsyncMessageChannelHandlers = {
  [K in AsyncMessageTypes]: (
    incoming: AsyncMessageRequestsMap[K]
  ) => Promise<
    IsTypeOnlyObject<AsyncMessageResponsesMap[K]> extends true
      ? never
      : Omit<AsyncMessageResponsesMap[K], 'type'>
  >;
};
