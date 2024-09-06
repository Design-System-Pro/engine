import hash from 'object-hash';
import type {
  AsyncMessageChannelHandlers,
  AsyncMessageRequests,
  AsyncMessageRequestsMap,
  AsyncMessageResponses,
  IncomingMessageEvent,
} from './message.types';
import { MessageType } from './message.types';

export const openUI = async () => {
  const hasOpenedPromise = new Promise((resolve) => {
    Message.widget.handle(MessageType.UIIsReady, () => {
      console.log('✨ UI is open - ✅');
      resolve(void 0);
      return Promise.resolve({});
    });
  });

  void new Promise(() => {
    console.log('✨ Show UI - 🙋');
    figma.showUI(__html__, {
      title: 'DS Project',
      visible: true,
    });
  });

  return hasOpenedPromise;
};

export const closeUI = () => {
  figma.closePlugin();
  console.log('✨ UI is closed - ❌');
};

type Channel = 'widget' | 'ui';

export class Message {
  public static widget: Message = new Message('widget');
  public static ui: Message = new Message('ui');

  protected channel: Channel = 'ui';

  protected handlers: Partial<AsyncMessageChannelHandlers> = {};

  constructor(channel: Channel) {
    this.channel = channel;
  }

  private attachMessageListener<Message>(
    callback: (
      message: Message
    ) => 'off' | undefined | Promise<'off' | undefined>,
    type?: MessageType
  ): () => void {
    if (this.channel === 'widget') {
      const listener = async (message: Message) => {
        const possiblePromise = callback(message);
        if (
          possiblePromise !== undefined &&
          (await possiblePromise) === 'off'
        ) {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
          figma.ui.off('message', listener);
          console.log(`🧩 Listener ${type} - ❌`);
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
      figma.ui.on('message', listener);
      console.log(`🧩 Listener ${type} - ✅`);
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
        figma.ui.off('message', listener);
        console.log(`🧩 Listener ${type} - ❌`);
      };
    }

    const listener = async (event: { data: { pluginMessage: Message } }) => {
      const possiblePromise = callback(event.data.pluginMessage);
      if (possiblePromise && (await possiblePromise) === 'off') {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
        window.removeEventListener('message', listener);
        console.log(`💅 Listener ${type} - ❌`);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
    window.addEventListener('message', listener);
    console.log(`💅 Listener ${type} - ✅`);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
      window.removeEventListener('message', listener);
      console.log(`💅 Listener ${type} - ❌`);
    };
  }

  /**
   * Continuously listens for messages and calls the callback
   */
  public handle<Type extends MessageType>(
    type: Type,
    callback: AsyncMessageChannelHandlers[Type]
  ): void {
    this.attachMessageListener(
      async (msg: { id?: string; message?: AsyncMessageRequestsMap[Type] }) => {
        // This appears to be related to the monaco editor being opened. It appears to post a message to the window message event listener with no data.
        if (!msg.id || !msg.message || msg.message.type !== type) {
          // console.warn(
          //   `${this.channel === 'ui' ? '💅' : '🧩'} Invalid message received`,
          //   msg
          // );
          return undefined;
        }

        try {
          const result = await callback(msg.message);
          const payload = { ...result, type: msg.message.type };

          if (this.channel === 'widget') {
            figma.ui.postMessage({
              id: msg.id,
              message: payload,
            });
            console.log(`🧩 ${payload.type} handled.`);
          } else {
            parent.postMessage(
              {
                pluginMessage: { id: msg.id, message: payload },
              },
              '*'
            );
            console.log(`💅 ${payload.type} handled.`);
          }
        } catch (error) {
          if (this.channel === 'widget') {
            figma.ui.postMessage({
              id: msg.id,
              error,
            });
            console.log(`🧩 Error was handled.`, error);
          } else {
            parent.postMessage(
              {
                pluginMessage: { id: msg.id, error },
              },
              '*'
            );
            console.log(`💅 Error was handled.`);
          }
        }
      },
      type
    );
  }

  /**
   * Sends a message without expecting a reply
   */
  public async send<Message extends AsyncMessageRequests>(
    message: Message
  ): Promise<void> {
    const messageId = hash({
      message,
      datetime: Date.now(),
    });

    if (this.channel === 'widget') {
      await openUI();

      figma.ui.postMessage({ id: messageId, message });
      console.log(`🧩 ${message.type} was sent - 🚀`);
    } else {
      parent.postMessage(
        {
          pluginMessage: { id: messageId, message },
        },
        'https://www.figma.com'
      );
      console.log(`💅 ${message.type} was sent - 🚀`);
    }
  }

  /**
   * Sends a message and expects a reply
   */
  public async request<Message extends AsyncMessageRequests>(
    message: Message
  ): Promise<AsyncMessageResponses & { type: Message['type'] }> {
    const messageId = hash({
      message,
      datetime: Date.now(),
    });

    const promise = new Promise<
      AsyncMessageResponses & { type: Message['type'] }
    >((resolve, reject) => {
      this.attachMessageListener<
        IncomingMessageEvent<
          AsyncMessageResponses & { type: Message['type'] }
        >['data']['pluginMessage']
      >((receivedMessage) => {
        if (receivedMessage.id === messageId) {
          if ('message' in receivedMessage) {
            resolve(receivedMessage.message);
          } else {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- as expected
            reject(receivedMessage.error);
          }
          return 'off';
        }
        return undefined;
      }, message.type);
    });

    if (this.channel === 'widget') {
      await openUI();

      figma.ui.postMessage({ id: messageId, message });
      console.log(`🧩 ${message.type} was requested - 🙋`);
    } else {
      parent.postMessage(
        {
          pluginMessage: { id: messageId, message },
        },
        'https://www.figma.com'
      );
      console.log(`💅 ${message.type} was requested - 🙋`);
    }

    return promise;
  }
}
