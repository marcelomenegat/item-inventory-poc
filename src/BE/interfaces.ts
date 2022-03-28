import { eEffectType, eEquipSlotType, eItemType, eSkillType } from "./enums";
import { tCharacterEquipments, tSocketClientEvents } from "./types";

export interface ICharacter {
  id: string;
  name: string;
  equipments: tCharacterEquipments;
  bank: string; // containerId
  mail: string; // containerId
}

export interface ICharacterModel {
  id: string;
  name: string;
  equipments: string; // containerId
  bank: string; // containerId
  mail: string; // containerId
}

export interface IContainerModel {
  id: string; // container id
  size: number;
  items: (string | null)[]; // item instance ids
  allowedItemTypes?: eItemType[]; // allowed item types in this container
}

export interface IContainer {
  id: string; // container id
  size: number;
  items: (IItemInstance | null)[];
  allowedItemTypes?: eItemType[]; // allowed item types in this container
}

export interface IItemInstance extends IItem {
  uniqueId: string; // item instance unique id
  quantity: number;
  ownerId?: string; // character id
  containerId?: string; // if the item is a container it will have a containerId
}

export interface IItemInstanceModel {
  id: string;
  itemId: string;
  quantity: number;
  ownerId?: string;
  containerId?: string;
}

export interface IItem {
  id: string;
  name: string;
  type: eItemType;
  weight: number;
  stackable: boolean; // determines if the item can be stacked
  spriteIds: string[]; // id of item sprite or sprites for an item with animation
  description?: string;
  level?: number;
  allowedEquipSlots?: eEquipSlotType[]; // slots where the item can be equiped
  attack?: number;
  defense?: number;
  skill?: eSkillType; // which skill will increase by using this item
  maxStack?: number; // maximum stack size
  effect?: eEffectType; // what will happen on item use
  effectPower?: number[]; // array with min and max values to item power on use
  effectDuration?: number; // determine if the effect will be instant or over time
}

export interface ISprite {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IRepository<T> {
  create: (model: Partial<T>) => Promise<T>;
  update(id: string, model: Partial<T>): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
}

export interface ICharacterProvider {
  create(character: Partial<ICharacter>): Promise<ICharacter>;
  getCharacterById(characterId: string): Promise<ICharacter>;
}

export interface IContainerProvider {
  create(container: Partial<IContainer>, fill: boolean): Promise<IContainer>;
  getContainerById(containerId: string): Promise<IContainer>;
  addItemToContainer({
    containerId,
    itemInstanceId,
    slot
  }: IAddItemToContainer): Promise<IContainer>;
}

export interface IItemProvider {
  getItemById(itemId: string): Promise<IItem>;
  getItemInstanceById(itemInstanceId: string): Promise<IItemInstance | null>;
}

export interface ISocketMessage<T> {
  event: T;
  payload?: any;
}

export interface ISocketConnection {
  dispatch: (message: ISocketMessage<tSocketClientEvents>) => void;
  disconnect: () => void;
}

export interface IGameState {
  character?: ICharacter;
  openedContainers: Set<string>;
  containersData: { [key: string]: IContainer };
  isDragging: boolean;
  isMouseLeftButtonPressed: boolean;
  mouseOverElement?: any;
  draggingElement?: any;
}

export interface IGameContainerProps {
  characterId: string;
}

export interface IMainUIProps {
  gameState: IGameState;
  onOpenContainer: (containerId: string) => void;
  onMouseOverElement: (element: any) => void;
}

export interface IEquipmentsProps {
  equipments: tCharacterEquipments;
  onOpenContainer: (containerId: string) => void;
  onMouseOverElement: (element: any) => void;
}

export interface IContainersProps {
  openedContainers: Set<string>;
  containersData: { [key: string]: IContainer };
  onMouseOverElement: (element: any) => void;
}

export interface IAddItemToContainer {
  containerId: string;
  slot: number;
  itemInstanceId: string;
}
