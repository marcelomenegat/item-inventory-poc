import { Socket } from "../BE/server";
import { useEffect, useRef, useCallback, useState } from "react";
import {
  IGameContainerProps,
  IGameState,
  ISocketConnection
} from "../BE/interfaces";

import { MainUI } from "../components/ui";

export const GameContainer = ({ characterId }: IGameContainerProps) => {
  const socketConnection = useRef<ISocketConnection | undefined>();
  const [gameState, setGameState] = useState<IGameState>({
    openedContainers: new Set(),
    containersData: {},
    isDragging: false,
    isMouseLeftButtonPressed: false
  });

  useEffect(() => {
    console.log(gameState);
    console.log("MOUSE OVER ELEMENT", gameState.mouseOverElement);
  }, [gameState.mouseOverElement]);

  useEffect(() => {
    if (gameState.isDragging === false) {
      console.log("DRAG ELEMENT", gameState.draggingElement);
      console.log("DROP TARGET", gameState.mouseOverElement);

      if (
        gameState.draggingElement === undefined ||
        gameState.mouseOverElement === undefined
      ) {
        return;
      }
      // teste
      // const { containerId, itemInstanceId, slot } = message.payload;
      socketConnection.current?.dispatch({
        event: "move-item",
        payload: {
          containerId: gameState.mouseOverElement.container.id,
          itemInstanceId: gameState.draggingElement.item.uniqueId,
          slot: gameState.mouseOverElement.containerSlotIndex
        }
      });

      setGameState({
        ...gameState,
        draggingElement: undefined,
        mouseOverElement: undefined,
        isMouseLeftButtonPressed: false
      });
    }
  }, [gameState.isDragging]);

  const handleSocketEvents = useCallback(({ event, payload }) => {
    console.log("GAME RECEIVED MESSAGE", event, payload);

    switch (event) {
      case "character-data": {
        setGameState((oldState) => ({
          ...oldState,
          character: payload
        }));

        break;
      }
      case "container-data": {
        setGameState((oldState) => ({
          ...oldState,
          containersData: {
            ...oldState.containersData,
            [payload.id]: payload
          }
        }));

        break;
      }
    }
  }, []);

  const handleOnOpenContainer = (containerId: string) => {
    const openedContainers = new Set(gameState.openedContainers);

    if (openedContainers.has(containerId) === true) {
      openedContainers.delete(containerId);

      setGameState({
        ...gameState,
        openedContainers
      });

      return;
    }

    openedContainers.add(containerId);

    setGameState({
      ...gameState,
      openedContainers
    });

    socketConnection.current?.dispatch({
      event: "get-container",
      payload: {
        containerId
      }
    });
  };

  const handleOnMouseMove = (event: any) => {
    if (gameState.isMouseLeftButtonPressed === true) {
      if (gameState.isDragging === true) {
        return;
      }

      setGameState({
        ...gameState,
        isDragging: true,
        draggingElement: gameState.mouseOverElement
      });
    }
  };

  const handleOnMouseUp = (event: any) => {
    if (event.button === 0) {
      setGameState({
        ...gameState,
        isDragging: false,
        isMouseLeftButtonPressed: false
      });
    }
  };

  const handleOnMouseDown = (event: any) => {
    if (event.button === 0) {
      setGameState({
        ...gameState,
        isMouseLeftButtonPressed: true
      });
    }
  };

  const handleMouseOverElement = (mouseOverElement: any) => {
    setGameState({
      ...gameState,
      mouseOverElement
    });
  };

  useEffect(() => {
    socketConnection.current = Socket.connect(characterId, handleSocketEvents);

    socketConnection.current.dispatch({
      event: "get-character"
    });

    return () => {
      socketConnection.current?.disconnect();
    };
  }, [characterId, handleSocketEvents]);

  return (
    <div
      id={"game-container"}
      className={
        gameState.isDragging === true ? "game-container--dragging" : ""
      }
      onMouseMove={handleOnMouseMove}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
    >
      <MainUI
        gameState={gameState}
        onOpenContainer={handleOnOpenContainer}
        onMouseOverElement={handleMouseOverElement}
      />
    </div>
  );
};
