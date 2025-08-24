import { GameObject } from "../../GameObject";
import type { LockType } from "../../LockType";
import Openable from "../Openable";

export abstract class Container extends Openable {
  protected _isContainer: boolean;
  protected _children: GameObject[];

  constructor(name: string, children?: GameObject[], lock?: LockType) {
    super(name, lock);
    this._isContainer = true;
    this._children = children ?? [];
  }

  addChild(obj: GameObject): GameObject {
    if (this._isContainer) {
      this._children.push(obj);
      return obj;
    } else {
      throw new Error(`Ce n'est pas un conteneur.`);
    }
  }

  displayContent(): string {
    if (this._children.length === 0) return `C'est vide.`;
    return `À l'intérieur ${this.genre === "masculine" ? "du" : "de la"} ${
      this.name
    }, il y a : ${this._children
      .map((c) => `${c.genre === "masculine" ? "un" : "une"} ${c.name}`)
      .join(", ")}.`;
  }

  unlock(): string {
    if (this.lock) {
      return `${this.name} a été déverrouillé(e).`;
    } else {
      return `${this.name} est déjà ouvert(e).`;
    }
  }

  public get children(): GameObject[] {
    return this._children;
  }
  public set children(value: GameObject[]) {
    this._children = value;
  }
}
