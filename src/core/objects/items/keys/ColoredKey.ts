import type { KeyColor } from "./KeyColor";
import { Key } from "./Key";

export class ColoredKey extends Key {
  private color: KeyColor;

  constructor(color: KeyColor) {
    super(`clef ${color}`);
    this.color = color;
  }

  examine(): string {
    return `Cette clef ${this.color} nous permettrait sans doute d'ouvrir les portes associées à cette couleur.`;
  }
}
