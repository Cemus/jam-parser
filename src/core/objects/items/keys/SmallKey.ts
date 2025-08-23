import { Key } from "./Key";

export class SmallKey extends Key {
  constructor() {
    super("petite clef");
  }

  examine(): string {
    return "Cette petite clef pourrait nous servir à ouvrir de petits objets comme des tiroirs.";
  }
}
