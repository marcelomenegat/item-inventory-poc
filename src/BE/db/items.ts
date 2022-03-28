import { eItemType } from "../enums";
import { IItem } from "../interfaces";

export const ITEMS_TABLE: IItem[] = [
  {
    id: "c6226e12-830a-4769-a4b2-5c7797e2974d",
    name: "Assassin Dagger",
    type: eItemType.weapon,
    weight: 17,
    stackable: false,
    spriteIds: ["dagger_01"],
    attack: 40,
    defense: 12
  },
  {
    id: "920bc465-a655-4a2b-8160-1262aadd4c74",
    name: "Dragon Slayer",
    type: eItemType.weapon,
    weight: 82,
    stackable: false,
    spriteIds: ["sword_01"],
    attack: 44,
    defense: 28
  },
  {
    id: "fafbc8d2-6563-443f-bc22-e92b58b54cb5",
    name: "Backpack",
    type: eItemType.container,
    weight: 3,
    stackable: false,
    spriteIds: ["bag_01"]
  },
  {
    id: "5efb5f75-fc32-4388-a767-32ffef5179ba",
    name: "Shovel",
    type: eItemType.tool,
    weight: 15,
    stackable: false,
    spriteIds: ["shovel"]
  }
];
