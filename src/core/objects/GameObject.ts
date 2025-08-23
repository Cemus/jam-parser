export abstract class GameObject {
  private _name: string;
  private _determiner?: string;

  constructor(name: string, determiner?: string) {
    this._name = name;
    this._determiner = determiner;
  }

  abstract observe(): string;
  abstract examine(): string;

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get determiner(): string | undefined {
    return this._determiner;
  }
  public set determiner(value: string | undefined) {
    this._determiner = value;
  }
}
