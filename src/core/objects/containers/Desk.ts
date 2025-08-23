import type { GameObject } from "../GameObject";
import type { LockType } from "../LockType";
import { Container } from "./Container";

export class Desk extends Container {
  constructor(children?: GameObject[], locked?: LockType) {
    super("bureau", children ?? [], locked);
    this.determiner = "ce";
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
