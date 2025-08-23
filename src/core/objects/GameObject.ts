import type { KeyColor } from "./KeyColor";
import type { LockType } from "./LockType";

export abstract class GameObject {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  abstract observe(): string;
  abstract examine(): string;

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
}

interface Lockable {
  locked?: LockType | null;
  unlock(key: Key): string;
}

export abstract class Item extends GameObject {
  abstract use(): void;
  abstract grab(): void;
}

abstract class Container extends GameObject implements Lockable {
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

export class Desk extends Container {
  constructor(children?: GameObject[], locked?: LockType) {
    super("bureau", children ?? [], locked ?? null);
  }

  observe(): string {
    return "un bureau abandonné";
  }

  examine(): string {
    return `Ce bureau contient : ${this._children
      .map((c) => c.name)
      .join(", ")}.`;
  }
}

export class Drawer extends Container {
  constructor(children?: GameObject[], locked?: LockType) {
    super("tiroir", children ?? [], locked ?? null);
  }

  observe(): string {
    return "Un tiroir.";
  }
  examine(): string {
    return "On pourrait peut-être essayer d'ouvrir ce tiroir ?";
  }
}

export abstract class Key extends Item {
  constructor(name: string) {
    super(name);
  }

  observe(): string {
    return `une ${this.name.toLowerCase()}`;
  }

  use() {}

  grab() {}
}

export class SmallKey extends Key {
  constructor() {
    super("petite clef");
  }

  examine(): string {
    return "Cette petite clef pourrait nous servir à ouvrir de petits objets comme des tiroirs.";
  }
}

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

export class Door extends GameObject {
  private _locked: LockType;

  constructor(name: string, locked?: LockType) {
    super(name);
    this._locked = locked ?? null;
  }

  observe(): string {
    return "une porte";
  }

  examine(): string {
    if (!this._locked) {
      return `La porte ${this.name} est ouverte.`;
    } else {
      return `Elle est verrouillée. La serrure est ${this._locked}.`;
    }
  }

  open(): void {
    //GOTO
  }
}
