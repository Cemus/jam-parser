import { GameObject } from "../GameObject";
import type { Lockable } from "../Lockable";
import type { LockType } from "../LockType";

export abstract class Container extends GameObject implements Lockable {
  _isContainer: boolean;
  _children: GameObject[];
  locked: LockType | null;

  constructor(name: string, children?: GameObject[], locked?: LockType) {
    super(name);
    this._isContainer = true;
    this._children = children ?? [];
    this.locked = locked ?? null;
  }

  addChild(obj: GameObject): GameObject {
    if (this._isContainer) {
      this._children.push(obj);
      return obj;
    } else {
      throw new Error(`Ce n'est pas un conteneur.`);
    }
  }

  open() {
    if (!this._isContainer) {
      return `Cet objet ne peut pas être ouvert.`;
    }
    if (this.locked) return `C'est verrouillé.`;
    if (this._children.length === 0) return `C'est vide.`;
    return `À l'intérieur, il y a : ${this._children
      .map((c) => c.name)
      .join(", ")}.`;
  }

  unlock(): string {
    if (this.locked) {
      return `${this.name} a été déverrouillé(e).`;
    } else {
      return `${this.name} est déjà ouvert(e).`;
    }
  }
}
