import { v4 as uuidv4 } from "uuid";

import { cloneObject } from "../../helpers/cloneObject";
import { IRepository } from "../interfaces";

export class Repository<T> implements IRepository<T> {
  constructor(private TABLE: any[]) {}

  create(model: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const newRegistry: any = cloneObject<T>(model);

        newRegistry.id = uuidv4();

        this.TABLE.push(newRegistry);

        resolve(newRegistry);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(id: string, model: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const registryIndex: number = this.TABLE.findIndex(
          (registry) => registry.id === id
        );

        if (registryIndex === -1) {
          throw new Error("Not found");
        }

        this.TABLE[registryIndex] = {
          ...this.TABLE[registryIndex],
          ...model,
          id
        };

        resolve(this.TABLE[registryIndex]);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.TABLE);
      } catch (error) {
        reject(error);
      }
    });
  }

  getById(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const registry: T | undefined = this.TABLE.find(
          (registry) => registry.id === id
        );

        if (registry === undefined) {
          throw new Error("Not found");
        }

        resolve(registry);
      } catch (error) {
        reject(error);
      }
    });
  }
}
