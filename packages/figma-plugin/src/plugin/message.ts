import type { AsyncMessage, AsyncMessageTypes } from '../types';

/**
 * Listens to a specific message type, returns the event and removes the listener
 */
function listenToPluginMessageOnce<
  MessageType extends AsyncMessageTypes,
  MessageResponse extends Omit<AsyncMessage<MessageType>, 'key'>,
>(
  messageType: MessageType,
  callback: (message: AsyncMessage<MessageType, MessageResponse>) => void
) {
  const handler = (message: AsyncMessage<MessageType, MessageResponse>) => {
    if (message.type !== messageType) {
      // Ignore event
      return;
    }

    callback(message);
    figma.ui.off('message', handler);
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.log(`🧩 Plugin Message type ${messageType} was received.`);
  };

  figma.ui.on('message', handler);
}

/**
 * Listens to a specific message type, returns the event and removes the listener
 */
export function listenToPluginMessage<
  MessageType extends AsyncMessageTypes,
  MessageResponse extends Omit<AsyncMessage<MessageType>, 'key'>,
>(
  messageType: MessageType,
  callback: (
    message: AsyncMessage<MessageType, MessageResponse>
  ) => void | Promise<void>
) {
  const handler = (message: AsyncMessage<MessageType, MessageResponse>) => {
    if (message.type !== messageType) {
      // Ignore event
      return;
    }

    void callback(message);
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.log(`🧩 Plugin Message type ${messageType} was received.`);
  };

  figma.ui.on('message', handler);
}

/**
 * Sends message to ui window and waits for response
 */
export const postRequestPluginMessage = async <
  MessageType extends AsyncMessageTypes,
  MessageRequest = unknown,
  MessageResponse = unknown,
>(
  requestType: MessageType,
  request: Omit<AsyncMessage<MessageType, MessageRequest>, 'type'>
): Promise<AsyncMessage<MessageType, MessageResponse>> => {
  figma.ui.postMessage(
    {
      pluginMessage: {
        type: requestType,
        ...request,
      },
    },
    // TODO: Try to narrow down the ui for the plugin only
    { origin: '*' }
  );

  // eslint-disable-next-line no-console -- TODO: replace with monitoring
  console.log(`🧩 Plugin Message type ${requestType} was posted.`);

  return new Promise((resolve) => {
    listenToPluginMessageOnce<
      MessageType,
      AsyncMessage<MessageType, MessageResponse>
    >(requestType, (message) => {
      resolve(message);
    });
  });
};

/**
 * Sends message to ui window without waiting for response
 */
export const postPluginMessage = <
  MessageType extends AsyncMessageTypes,
  MessageRequest = unknown,
>(
  responseType: MessageType,
  request: Omit<MessageRequest, 'type'>
): void => {
  figma.ui.postMessage(
    {
      pluginMessage: {
        type: responseType,
        ...request,
      },
    },
    // TODO: Try to narrow down the ui for the plugin only
    { origin: '*' }
  );
  // eslint-disable-next-line no-console -- TODO: replace with monitoring
  console.log(`🧩 Plugin Message type ${responseType} was posted.`);
};
