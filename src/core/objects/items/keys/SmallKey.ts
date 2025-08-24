import { Key } from "./Key";

export class SmallKey extends Key {
  constructor(hidden?: boolean) {
    super("petite clef", hidden);
    this.consumable = true;
    this.unlocks = ["smallKey"];
  }

  examine(): string {
    return "Cette petite clef pourrait nous servir à ouvrir de petits objets comme des tiroirs.";
  }
}
