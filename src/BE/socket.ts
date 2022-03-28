import {
  ICharacterProvider,
  IContainerProvider,
  ISocketConnection,
  ISocketMessage
} from "./interfaces";

import {
  tSocketClientEvents,
  tSocketConsumerCallback,
  tSocketServerEvents
} from "./types";

export class SocketMock {
  consumers: { [key: string]: tSocketConsumerCallback } = {};

  constructor(
    private containerProvider: IContainerProvider,
    private characterProvider: ICharacterProvider
  ) {}

  connect(
    characterId: string,
    callback: tSocketConsumerCallback
  ): ISocketConnection {
    this.consumers[characterId] = callback;

    this.emit(characterId, {
      event: "connect"
    });

    return {
      dispatch: (message: ISocketMessage<tSocketClientEvents>) =>
        this.dispatch(characterId, message),
      disconnect: () => this.disconnect(characterId)
    };
  }

  private disconnect(characterId: string): void {
    this.emit(characterId, {
      event: "disconnect"
    });

    delete this.consumers[characterId];
  }

  private emit(
    consumerId: string,
    message: ISocketMessage<tSocketServerEvents>
  ) {
    this.consumers[consumerId](message);
  }

  private async dispatch(
    consumerId: string,
    message: ISocketMessage<tSocketClientEvents>
  ) {
    try {
      console.log("SERVER RECEIVED MESSAGE", message);

      let responseMessages: ISocketMessage<tSocketServerEvents>[] = [];

      switch (message.event) {
        case "get-character": {
          const character = await this.characterProvider.getCharacterById(
            consumerId
          );

          if (character !== undefined) {
            responseMessages.push({
              event: "character-data",
              payload: character
            });
          }

          break;
        }
        case "get-container": {
          const { containerId } = message.payload;

          const container = await this.containerProvider.getContainerById(
            containerId
          );

          if (container !== undefined) {
            responseMessages.push({
              event: "container-data",
              payload: container
            });
          }

          break;
        }
        case "move-item": {
          const { containerId, itemInstanceId, slot } = message.payload;

          const container = await this.containerProvider.addItemToContainer({
            containerId,
            itemInstanceId,
            slot
          });

          if (container !== undefined) {
            responseMessages.push({
              event: "container-data",
              payload: container
            });
          }

          break;
        }
      }

      setTimeout(() => {
        if (responseMessages !== undefined) {
          responseMessages.forEach((message) => {
            this.emit(consumerId, message);
          });
        }
      }, 200);
    } catch (error) {
      console.log("FAILED WHILE DISPATCHING MESSAGE TO SERVER");
    }
  }
}
