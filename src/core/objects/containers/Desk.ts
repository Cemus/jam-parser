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

    if (this.children.length > 1) {
      return `Ce bureau contient : ${this._children
        .map((c) => c.name)
        .join(", ")}.`;
    }

    return `Ce bureau contient ${
      this.children[0].genre === "masculine" ? "un" : "une"
    } ${this.children[0].name}.`;
  }
}
