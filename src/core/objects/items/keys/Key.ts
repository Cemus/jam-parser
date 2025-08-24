import type { LockType } from "../../LockType";
import { Item } from "../Item";

export abstract class Key extends Item {
  unlocks: LockType[];

  constructor(name: string, hidden?: boolean) {
    super(name, hidden);
    this.genre = "feminine";
    this.unlocks = [];
  }

  observe(): string {
    return `une ${this.name.toLowerCase()}`;
  }
}
