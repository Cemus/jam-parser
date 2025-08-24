import type { LockType } from "../../LockType";
import Openable from "../Openable";

export class Door extends Openable {
  constructor(name: string, lock?: LockType) {
    super(name, lock);
    this.genre = "feminine";
  }

  observe(): string {
    return "une porte";
  }

  examine(): string {
    if (this.lock) {
      return `Une vieille porte, sa serrure est de couleur ${this.lock}.`;
    }
    return `Une vieille porte, je pourrais essayer de l'ouvrir.`;
  }

  unlock(): string {
    if (this.lock) {
      return `${this.name} a été déverrouillé(e).`;
    } else {
      return `${this.name} est déjà ouvert(e).`;
    }
  }
}
