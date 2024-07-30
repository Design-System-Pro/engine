import type {
  AsyncMessage,
  AsyncMessageTypes,
  PluginMessageEvent,
} from '../types';

/**
 * Listens to a specific message type, returns the event and removes the listener
 */
function listenToPluginMessage<
  MessageType extends AsyncMessageTypes,
  MessageResponse extends Omit<AsyncMessage<MessageType>, 'key'>,
>(
  messageType: MessageType,
  callback: (event: PluginMessageEvent<MessageType, MessageResponse>) => void
) {
  const handler = (event: PluginMessageEvent<MessageType, MessageResponse>) => {
    if (event.data.pluginMessage.type !== messageType) {
      // Ignore event
      return;
    }

    callback(event);
    window.removeEventListener('message', handler);
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.log(`💅 Plugin UI Message type ${messageType} was received.`);
  };

  // eslint-disable-next-line no-console -- TODO: replace with monitoring
  console.log(`💅 Plugin UI listening to ${messageType} message type.`);
  window.addEventListener('message', handler);
}

/**
 * Sends message to parent window and waits for response
 */
export const postRequestPluginMessage = async <
  MessageType extends AsyncMessageTypes,
  MessageRequest = unknown,
  MessageResponse = unknown,
>(
  requestType: MessageType,
  request: Omit<AsyncMessage<MessageType, MessageRequest>, MessageType>
): Promise<AsyncMessage<MessageType, MessageResponse>> => {
  const promise = new Promise<AsyncMessage<MessageType, MessageResponse>>(
    (resolve) => {
      listenToPluginMessage<
        MessageType,
        AsyncMessage<MessageType, MessageResponse>
      >(requestType, (event) => {
        resolve(event.data.pluginMessage);
      });
    }
  );

  parent.postMessage(
    {
      pluginMessage: {
        type: requestType,
        ...request,
      },
    },
    'https://www.figma.com'
  );

  // eslint-disable-next-line no-console -- TODO: replace with monitoring
  console.log(`💅 Plugin UI Message type ${requestType} was posted.`);

  return promise;
};

/**
 * Sends message to parent window without waiting for response
 */
export const postPluginMessage = <
  MessageType extends AsyncMessageTypes,
  MessageRequest = unknown,
>(
  responseType: MessageType,
  request: Omit<MessageRequest, 'type'>
): void => {
  parent.postMessage(
    {
      pluginMessage: {
        type: responseType,
        ...request,
      },
    },
    'https://www.figma.com'
  );

  // eslint-disable-next-line no-console -- TODO: replace with monitoring
  console.log(`💅 Plugin UI Message type ${responseType} was posted.`);
};
