import { Key } from "./Key";

export class SmallKey extends Key {
  constructor(hidden?: boolean) {
    super("petite clef", hidden);
  }

  examine(): string {
    return "Cette petite clef pourrait nous servir à ouvrir de petits objets comme des tiroirs.";
  }
}
