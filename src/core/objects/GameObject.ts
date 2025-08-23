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
