import { ITEM_INSTANCES_TABLE } from "../db/itemInstances";
import { IItemInstanceModel } from "../interfaces";
import { Repository } from "./repository";

export class ItemInstanceRepository extends Repository<IItemInstanceModel> {
  constructor() {
    super(ITEM_INSTANCES_TABLE);
  }
}
