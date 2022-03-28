import { eEquipSlotType } from "./enums";
import { IItemInstance, ISocketMessage } from "./interfaces";

export type tCharacterEquipments = {
  [key in eEquipSlotType]: IItemInstance | null;
};

type tCharacterServerSocketEvents = "character-data";
type tCharacterClientSocketEvents = "get-character";

type tContainerServerSocketEvents = "container-data";
type tContainerClientSocketEvents = "get-container" | "move-item";

export type tSocketServerEvents =
  | "connect"
  | "disconnect"
  | tCharacterServerSocketEvents
  | tContainerServerSocketEvents;

export type tSocketClientEvents =
  | tCharacterClientSocketEvents
  | tContainerClientSocketEvents;

export type tSocketConsumerCallback = (
  message: ISocketMessage<tSocketServerEvents>
) => void;
