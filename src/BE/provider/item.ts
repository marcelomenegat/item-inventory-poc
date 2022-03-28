import {
  IItem,
  IItemInstance,
  IItemInstanceModel,
  IItemProvider,
  IRepository
} from "../interfaces";

export class ItemProvider implements IItemProvider {
  constructor(
    private itemRepository: IRepository<IItem>,
    private itemInstanceRepository: IRepository<IItemInstanceModel>
  ) {}

  async getItemById(itemId: string): Promise<IItem> {
    try {
      const item: IItem = await this.itemRepository.getById(itemId);

      return item;
    } catch (error) {
      throw new Error(`Failed to load item ${itemId}`);
    }
  }

  async getItemInstanceById(
    itemInstanceId: string
  ): Promise<IItemInstance | null> {
    try {
      const {
        id,
        quantity,
        ownerId,
        containerId,
        itemId
      }: IItemInstanceModel = await this.itemInstanceRepository.getById(
        itemInstanceId
      );

      const item: IItem = await this.getItemById(itemId);

      return {
        ...item,
        uniqueId: id,
        quantity,
        ownerId,
        containerId
      };
    } catch (error) {
      throw new Error(`Failed to load itemInstance ${itemInstanceId}`);
    }
  }
}
