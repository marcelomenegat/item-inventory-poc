import { ITEMS_TABLE } from "../db/items";
import { IItem } from "../interfaces";
import { Repository } from "./repository";

export class ItemRepository extends Repository<IItem> {
  constructor() {
    super(ITEMS_TABLE);
  }
}
