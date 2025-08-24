import { GameObject } from "../GameObject";

export abstract class Item extends GameObject {
  consumable?: boolean;

  constructor(name: string, hidden?: boolean, consumable?: boolean) {
    super(name, hidden);
    consumable = consumable ?? false;
  }
}
