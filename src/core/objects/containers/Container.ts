import { GameObject } from "../GameObject";

export abstract class Container extends GameObject {
  protected _isContainer: boolean;
  protected _children: GameObject[];

  constructor(name: string, children?: GameObject[]) {
    super(name);
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
      child.hidden = false;
    }
  }

  public get children(): GameObject[] {
    return this._children;
  }
  public set children(value: GameObject[]) {
    this._children = value;
  }
}
