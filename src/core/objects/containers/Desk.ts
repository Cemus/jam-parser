import type { GameObject } from "../GameObject";
import { Container } from "./Container";

export class Desk extends Container {
  constructor(children?: GameObject[]) {
    super("bureau", children ?? []);
    this.genre = "masculine";
  }

  observe(): string {
    return "un bureau abandonné";
  }

  examine(): string {
    this.revealChildren();

    return `Ce bureau contient : ${this._children
      .map((c) => `${c.genre === "masculine" ? "un" : "une"} ${c.name}`)
      .join(", ")}.`;
  }
}
