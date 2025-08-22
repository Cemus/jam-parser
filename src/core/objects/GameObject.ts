export default abstract class GameObject {
  name: string;
  isContainer: boolean;
  isOpen?: boolean;
  children: GameObject[];

  constructor(name: string, options: Partial<GameObject> = {}) {
    this.name = name;
    this.isContainer = options.isContainer ?? false;
    this.isOpen = options.isOpen ?? false;
    this.children = options.children ?? [];
  }

  addChild(obj: GameObject): GameObject {
    if (this.isContainer) {
      this.children.push(obj);
      return obj;
    } else {
      throw new Error(`${this.name} n'est pas un conteneur.`);
    }
  }

  open() {
    if (!this.isContainer) {
      return `${this.name} ne peut pas être ouvert.`;
    }
    if (!this.isOpen) return `${this.name} est verrouillé.`;
    if (this.children.length === 0) return `${this.name} est vide.`;
    return `À l'intérieur, il y a : ${this.children
      .map((c) => c.name)
      .join(", ")}.`;
  }

  abstract observe(): string;
  abstract examine(): string;
}

export class Desk extends GameObject {
  constructor(children: GameObject[]) {
    super("Bureau");
    this.isContainer = true;
    this.isOpen = true;
    this.children = children;
  }

  observe(): string {
    return "Un bureau abandonné.";
  }

  examine(): string {
    return `Ce bureau contient : ${this.children
      .map((c) => c.name)
      .join(", ")}.`;
  }
}

export abstract class Key extends GameObject {
  constructor(name: string) {
    super(name);
  }

  observe(): string {
    return `Une ${this.name.toLowerCase()}.`;
  }
}

export class SmallKey extends Key {
  constructor() {
    super("Petite clef");
  }

  examine(): string {
    return "Cette petite clef nous servir à ouvrir de petits objets comme des tiroirs.";
  }
}

export class ColoredKey extends Key {
  private color: string;

  constructor(color: string) {
    super(`Clef ${color}`);
    this.color = color;
  }

  examine(): string {
    return `Cette clef ${this.color} nous permettrait sans doute d'ouvrir les portes associées à cette couleur.`;
  }
}
