import { Item } from "../Item";

export abstract class Key extends Item {
  constructor(name: string, hidden?: boolean) {
    super(name, hidden);
    this.genre = "feminine";
  }

  observe(): string {
    return `une ${this.name.toLowerCase()}`;
  }
}
