import type { GameObject } from "../GameObject";
import type { LockType } from "../LockType";
import { OpenableContainer } from "../OpenableContainer";

export class Drawer extends OpenableContainer {
  constructor(children?: GameObject[], lock?: LockType, hidden?: boolean) {
    super("tiroir", children ?? [], lock, hidden);
    this.genre = "masculine";
  }

  observe(): string {
    return "Un tiroir.";
  }

  examine(): string {
    if (!this.isOpen) {
      return "On pourrait peut-être essayer d'ouvrir ce tiroir ?";
    } else {
      return this.displayContent();
    }
  }
}
