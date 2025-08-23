import { GameObject } from "../GameObject";

export abstract class Item extends GameObject {
  abstract use(): void;
  abstract grab(): void;
}
