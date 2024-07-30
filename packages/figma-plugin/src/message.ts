import hash from 'object-hash';
import type {
  AsyncMessageChannelHandlers,
  AsyncMessageRequests,
  AsyncMessageRequestsMap,
  AsyncMessageResponses,
  AsyncMessageTypes,
  IncomingMessageEvent,
} from './types';

type Channel = 'plugin' | 'ui';

export class AsyncMessage {
  public static plugin: AsyncMessage = new AsyncMessage('plugin');
  public static ui: AsyncMessage = new AsyncMessage('ui');

  protected channel: Channel = 'ui';

  protected handlers: Partial<AsyncMessageChannelHandlers> = {};

  constructor(channel: Channel) {
    this.channel = channel;
  }

  private attachMessageListener<Message>(
    callback: (
      message: Message
    ) => 'off' | undefined | Promise<'off' | undefined>
  ): () => void {
    if (this.channel === 'plugin') {
      const listener = async (message: Message) => {
        const possiblePromise = callback(message);
        if (
          possiblePromise !== undefined &&
          (await possiblePromise) === 'off'
        ) {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
          figma.ui.off('message', listener);
          console.log('🧩 Listener OFF. Possible Promise.');
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
      figma.ui.on('message', listener);
      console.log('🧩 Listener ON.');
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
        figma.ui.off('message', listener);
        console.log('🧩 Listener OFF. Return Function.');
      };
    }

    const listener = async (event: { data: { pluginMessage: Message } }) => {
      const possiblePromise = callback(event.data.pluginMessage);
      if (possiblePromise && (await possiblePromise) === 'off') {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
        window.removeEventListener('message', listener);
        console.log('💅 Listener OFF.');
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
    window.addEventListener('message', listener);
    console.log('💅 Listener ON.');
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- We don't expect to use the result of the listener
      window.removeEventListener('message', listener);
      console.log('💅 Listener OFF.');
    };
  }

  /**
   * Continuously listens for messages and calls the callback
   */
  public handle<MessageType extends AsyncMessageTypes>(
    type: MessageType,
    callback: AsyncMessageChannelHandlers[MessageType]
  ): void {
    this.attachMessageListener(
      async (msg: {
        id?: string;
        message?: AsyncMessageRequestsMap[MessageType];
      }) => {
        // This appears to be related to the monaco editor being opened. It appears to post a message to the window message event listener with no data.
        if (!msg.id || !msg.message || msg.message.type !== type) {
          // eslint-disable-next-line no-console -- TODO: replace with monitoring
          console.warn('🧩 Invalid message received', msg);
          return undefined;
        }

        try {
          // @README need to cast to any to make this work
          // it causes a complex type which can not be resolved due to its depth

          const result = await callback(msg.message);
          const payload = { ...result, type: msg.message.type };

          if (this.channel === 'plugin') {
            figma.ui.postMessage({
              id: msg.id,
              message: payload,
            });
            console.log(`🧩 Plugin Message type", ${payload.type}, was sent.`);
          } else {
            parent.postMessage(
              {
                pluginMessage: { id: msg.id, message: payload },
              },
              '*'
            );
            console.log(
              `💅 UI Plugin Message type", ${payload.type}, was sent.`
            );
          }
        } catch (err) {
          // eslint-disable-next-line no-console -- TODO: replace with monitoring
          console.error('🧩 Plugin Error', err);
          if (this.channel === 'plugin') {
            figma.ui.postMessage({
              id: msg.id,
              error: err,
            });
            console.log(`🧩 Plugin Error Message was sent.`);
          } else {
            parent.postMessage(
              {
                pluginMessage: { id: msg.id, error: err },
              },
              '*'
            );
            console.log(`💅 UI Plugin Error Message was sent.`);
          }
        }
      }
    );
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
    }) as string;

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
      });
    });

    if (this.channel === 'plugin') {
      figma.ui.postMessage({ id: messageId, message });
      console.log(`🧩 Plugin Message type", ${message.type}, was sent.`);
    } else {
      parent.postMessage(
        {
          pluginMessage: { id: messageId, message },
        },
        'https://www.figma.com'
      );
      console.log(`💅 UI Plugin Message type", ${message.type}, was sent.`);
    }

    return promise;
  }

  // /**
  //  * Sends a message without expecting a reply
  //  */
  // public send<Message extends AsyncMessageRequests>(
  //   message: IncomingMessageEvent<
  //     AsyncMessageResponses & { type: Message['type'] }
  //   >['data']['pluginMessage']
  // ): void {
  //   if (this.channel === 'plugin') {
  //     figma.ui.postMessage(message);
  //     console.log(`🧩 Plugin Message type", ${message.type}, was sent.`);
  //     return;
  //   }

  //   parent.postMessage(
  //     {
  //       pluginMessage: message,
  //     },
  //     'https://www.figma.com'
  //   );
  //   console.log(`💅 UI Plugin Message type", ${message.type}, was sent.`);
  // }
}
