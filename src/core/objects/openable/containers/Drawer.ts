import type { GameObject } from "../../GameObject";
import type { LockType } from "../../LockType";
import { Container } from "./Container";

export class Drawer extends Container {
  constructor(children?: GameObject[], lock?: LockType) {
    super("tiroir", children ?? [], lock);
    this.genre = "masculine";
  }

  observe(): string {
    return "Un tiroir.";
  }
  examine(): string {
    return "On pourrait peut-être essayer d'ouvrir ce tiroir ?";
  }
}
