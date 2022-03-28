import { CHARACTERS_TABLE } from "../db/characters";
import { ICharacterModel } from "../interfaces";
import { Repository } from "./repository";

export class CharacterRepository extends Repository<ICharacterModel> {
  constructor() {
    super(CHARACTERS_TABLE);
  }
}
