import { Item } from "../Item";

export abstract class Key extends Item {
  constructor(name: string) {
    super(name);
  }

  observe(): string {
    return `une ${this.name.toLowerCase()}`;
  }

  use() {}

  grab() {}
}
