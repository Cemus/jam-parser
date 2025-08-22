import type GameObject from "../../objects/GameObject";
import type { CellType } from "./CellType";

export interface Cell {
  name: string;
  type: CellType;
  isOpen?: boolean;
  hasItem?: string;
  hidden?: boolean;
  walkable: boolean;

  object?: GameObject;
}
