import type { GameObject } from "../../GameObject";
import type { LockType } from "../../LockType";
import { Container } from "./Container";

export class Desk extends Container {
  constructor(children?: GameObject[], lock?: LockType) {
    super("bureau", children ?? [], lock);
    this.genre = "masculine";
  }

  observe(): string {
    return "un bureau abandonné";
  }

  examine(): string {
    return `Ce bureau contient : ${this._children
      .map((c) => c.name)
      .join(", ")}.`;
  }
}
