import { GameObject } from "./GameObject";
import type { LockType } from "./LockType";
import Openable from "./Openable";

export abstract class OpenableContainer extends Openable {
  protected _isContainer: boolean;
  protected _children: GameObject[];
  protected _isOpen: boolean = false;

  constructor(
    name: string,
    children?: GameObject[],
    lock?: LockType,
    hidden?: boolean
  ) {
    super(name, lock, hidden);
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

  revealChildren() {
    for (const child of this.children) {
      if (!this.lock) {
        child.hidden = false;
      }
    }
  }

  open(): void {
    this.revealChildren();
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  public get children(): GameObject[] {
    return this._children;
  }
  public set children(value: GameObject[]) {
    this._children = value;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }
  public set isOpen(value: boolean) {
    this._isOpen = value;
  }
}
