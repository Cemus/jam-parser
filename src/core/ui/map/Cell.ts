import type { GameObject } from "../../objects/GameObject";
import type { CellType } from "./CellType";

export interface Cell {
  name: string;
  type: CellType;
  walkable: boolean;

  object?: GameObject | null;
}
