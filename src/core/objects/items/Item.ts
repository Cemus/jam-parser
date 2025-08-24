import { GameObject } from "../GameObject";

export abstract class Item extends GameObject {
  constructor(name: string, hidden?: boolean) {
    super(name, hidden);
  }
}
