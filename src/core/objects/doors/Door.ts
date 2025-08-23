import { GameObject } from "../GameObject";
import type { Lockable } from "../Lockable";
import type { LockType } from "../LockType";

export class Door extends GameObject implements Lockable {
  private _locked: LockType | null;

  constructor(name: string, locked?: LockType) {
    super(name);
    this._locked = locked ?? null;
  }

  observe(): string {
    return "une porte";
  }

  examine(): string {
    if (this._locked) {
      return `Une vieille porte, sa serrure est de couleur ${this._locked}.`;
    }
    return `Une vieille porte, je pourrais essayer de l'ouvrir.`;
  }

  open(): string | void {
    if (!this._locked) {
      //GOTO
    } else {
      return `Elle est verrouillée.`;
    }
  }

  unlock(): string {
    if (this._locked) {
      return `${this.name} a été déverrouillé(e).`;
    } else {
      return `${this.name} est déjà ouvert(e).`;
    }
  }
}
