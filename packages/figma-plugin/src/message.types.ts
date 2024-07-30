import type { DesignTokens } from 'style-dictionary/types';

export enum AsyncMessageTypes {
  SetAccessToken = 'set-access-token',
  GetAccessToken = 'get-access-token',
  GetStyleDictionary = 'get-style-dictionary',
  DeleteAccessToken = 'delete-access-token',
}

// export interface AsyncMessageRequest<MessageType extends AsyncMessageType> {
//   type: MessageType;
// }

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

export type GetAccessTokenRequest =
  AsyncMessage<AsyncMessageTypes.GetAccessToken>;
export type SetAccessTokenRequest = AsyncMessage<
  AsyncMessageTypes.SetAccessToken,
  {
    accessToken: string;
  }
>;
export type DeleteAccessTokenRequest =
  AsyncMessage<AsyncMessageTypes.DeleteAccessToken>;

export type GetAccessTokenResponse = AsyncMessage<
  AsyncMessageTypes.GetAccessToken,
  {
    accessToken: string;
  }
>;

export type GetStyleDictionaryRequest =
  AsyncMessage<AsyncMessageTypes.GetStyleDictionary>;

export type GetStyleDictionaryResponse = AsyncMessage<
  AsyncMessageTypes.GetStyleDictionary,
  {
    styleDictionary: DesignTokens;
  }
>;

export type AsyncMessageRequests =
  | GetAccessTokenRequest
  | SetAccessTokenRequest
  | DeleteAccessTokenRequest
  | GetStyleDictionaryRequest;

export type AsyncMessageResponses =
  | GetAccessTokenResponse
  | GetStyleDictionaryResponse;

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
