import type { DesignTokens } from 'style-dictionary/types';

export enum MessageType {
  UIReady = 'ui-ready',
  LoadAccessToken = 'load-access-token',
  SetAccessToken = 'set-access-token',
  DeleteAccessToken = 'delete-access-token',
  LoadStyleDictionary = 'load-style-dictionary',
}

export type Message =
  | {
      type: MessageType.UIReady;
    }
  | {
      type: MessageType.SetAccessToken;
      token: string;
    }
  | {
      type: MessageType.DeleteAccessToken;
    }
  | {
      type: MessageType.LoadAccessToken;
      token: string;
    }
  | {
      type: MessageType.LoadStyleDictionary;
      styleDictionary: DesignTokens;
    };

export type PluginMessageEvent = MessageEvent<{
  pluginMessage: Message;
}>;
