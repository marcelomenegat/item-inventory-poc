import {
  ICharacter,
  ICharacterModel,
  ICharacterProvider,
  IContainer,
  IContainerProvider,
  IRepository
} from "../interfaces";
import { tCharacterEquipments } from "../types";

export class CharacterProvider implements ICharacterProvider {
  constructor(
    private characterRepository: IRepository<ICharacterModel>,
    private containerProvider: IContainerProvider
  ) {}

  async getCharacterById(characterId: string): Promise<ICharacter> {
    try {
      const characterModel: ICharacterModel = await this.characterRepository.getById(
        characterId
      );

      const { id, name, bank, mail } = characterModel;

      const equipments: tCharacterEquipments = await this.loadCharacterEquipments(
        characterModel.equipments
      );

      return {
        id,
        name,
        equipments,
        bank,
        mail
      };
    } catch (error) {
      throw new Error(`Failed to load character ${characterId}`);
    }
  }

  async create(character: Partial<ICharacter>): Promise<ICharacter> {
    try {
      const [
        equipmentsContainer,
        bankContainer,
        mailContainer
      ] = await Promise.all([
        this.createCharacterEquipments(),
        this.containerProvider.create(
          {
            size: 20
          },
          false
        ),
        this.containerProvider.create(
          {
            size: 5
          },
          false
        )
      ]);

      const newCharacter: ICharacterModel = await this.characterRepository.create(
        {
          name: character.name,
          bank: bankContainer.id,
          mail: mailContainer.id,
          equipments: equipmentsContainer.id
        }
      );

      return this.getCharacterById(newCharacter.id);
    } catch (error) {
      throw new Error(`Failed to create character`);
    }
  }

  async createCharacterEquipments(): Promise<IContainer> {
    try {
      const equipmentsContainer: IContainer = await this.containerProvider.create(
        {
          size: 9
        },
        true
      );

      return equipmentsContainer;
    } catch (error) {
      throw new Error(`Failed to create character equipments`);
    }
  }

  async loadCharacterEquipments(
    containerId: string
  ): Promise<tCharacterEquipments> {
    try {
      const {
        items
      }: IContainer = await this.containerProvider.getContainerById(
        containerId
      );

      const [
        head,
        neck,
        leftHand,
        rightHand,
        ring,
        legs,
        boots,
        accessory,
        inventory
      ] = items;

      return {
        head,
        neck,
        leftHand,
        rightHand,
        ring,
        legs,
        boots,
        accessory,
        inventory
      };
    } catch (error) {
      throw new Error(`Failed to load character equipments`);
    }
  }
}
