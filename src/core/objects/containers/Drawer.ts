import type { GameObject } from "../GameObject";
import type { LockType } from "../LockType";
import { Container } from "./Container";

export class Drawer extends Container {
  constructor(children?: GameObject[], locked?: LockType) {
    super("tiroir", children ?? [], locked ?? null);
  }

  observe(): string {
    return "Un tiroir.";
  }
  examine(): string {
    return "On pourrait peut-être essayer d'ouvrir ce tiroir ?";
  }
}
