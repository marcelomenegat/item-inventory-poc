import { cloneObject } from "../../helpers/cloneObject";
import {
  IAddItemToContainer,
  IContainer,
  IContainerModel,
  IContainerProvider,
  IItemInstance,
  IItemProvider,
  IRepository
} from "../interfaces";

export class ContainerProvider implements IContainerProvider {
  constructor(
    private containerRepository: IRepository<IContainerModel>,
    private itemProvider: IItemProvider
  ) {}

  async getContainerById(containerId: string): Promise<IContainer> {
    try {
      const containerModel: IContainerModel = await this.containerRepository.getById(
        containerId
      );

      const { id, size, allowedItemTypes } = containerModel;

      const items: (IItemInstance | null)[] = await Promise.all(
        containerModel.items.map((item) => {
          if (item === null) {
            return Promise.resolve(null);
          }

          return this.itemProvider.getItemInstanceById(item);
        })
      );

      return {
        id,
        size,
        allowedItemTypes,
        items
      };
    } catch (error) {
      throw new Error(`Failed to load container ${containerId}`);
    }
  }

  async create(
    container: Partial<IContainer>,
    fill: boolean = false
  ): Promise<IContainer> {
    try {
      const items: null[] = [];
      const size = container.size || 8;

      if (fill === true) {
        for (let index = 0; index < size; index++) {
          items.push(null);
        }
      }

      const newContainer: IContainerModel = await this.containerRepository.create(
        {
          size,
          items,
          allowedItemTypes: container.allowedItemTypes
        }
      );

      const createdContainer: IContainer = await this.getContainerById(
        newContainer.id
      );

      return createdContainer;
    } catch (error) {
      throw new Error(`Failed to create container`);
    }
  }

  async addItemToContainer({
    containerId,
    itemInstanceId,
    slot
  }: IAddItemToContainer): Promise<IContainer> {
    try {
      const container: IContainerModel = await this.containerRepository.getById(
        containerId
      );

      const items: string[] = cloneObject(container.items);

      items.splice(slot, 0, itemInstanceId);

      this.containerRepository.update(containerId, {
        items
      });

      const updatedContainer: IContainer = await this.getContainerById(
        containerId
      );

      return updatedContainer;
    } catch (error) {
      throw new Error(
        `Failed to add item ${itemInstanceId} to container ${containerId}`
      );
    }
  }
}

// interface IMoveItemFromContainer {
//   from: {
//     container: IContainer;
//     itemUniqueId: string;
//     slot: number;
//   };
//   to: {
//     container: IContainer;
//     itemUniqueId: string;
//     slot: number;
//   };
// }
