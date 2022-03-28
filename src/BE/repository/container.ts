import { CONTAINERS_TABLE } from "../db/containers";
import { IContainerModel } from "../interfaces";
import { Repository } from "./repository";

export class ContainerRepository extends Repository<IContainerModel> {
  constructor() {
    super(CONTAINERS_TABLE);
  }
}
