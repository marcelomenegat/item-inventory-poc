import {
  IRepository,
  ICharacterModel,
  IItem,
  IItemInstanceModel,
  ICharacterProvider,
  IContainerProvider,
  IItemProvider,
  IContainerModel
} from "./interfaces";

import { CharacterRepository } from "./repository/character";
import { ContainerRepository } from "./repository/container";
import { ItemInstanceRepository } from "./repository/itemInstance";
import { ItemRepository } from "./repository/item";

import { CharacterProvider } from "./provider/character";
import { ContainerProvider } from "./provider/container";

import { SocketMock } from "./socket";
import { ItemProvider } from "./provider/item";

//Repository
const containerRepository: IRepository<IContainerModel> = new ContainerRepository();
const characterRepository: IRepository<ICharacterModel> = new CharacterRepository();
const itemRepository: IRepository<IItem> = new ItemRepository();
const itemInstanceRepository: IRepository<IItemInstanceModel> = new ItemInstanceRepository();

//Providers
const itemProvider: IItemProvider = new ItemProvider(
  itemRepository,
  itemInstanceRepository
);

const containerProvider: IContainerProvider = new ContainerProvider(
  containerRepository,
  itemProvider
);

const characterProvider: ICharacterProvider = new CharacterProvider(
  characterRepository,
  containerProvider
);

export const Socket = new SocketMock(containerProvider, characterProvider);
