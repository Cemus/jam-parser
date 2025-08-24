export abstract class GameObject {
  private _name: string;
  private _determiner?: string;
  private _hidden: boolean;

  constructor(name: string, hidden?: boolean, determiner?: string) {
    this._name = name;
    this._determiner = determiner;
    this._hidden = hidden ?? false;
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

  public get hidden(): boolean {
    return this._hidden;
  }
  public set hidden(value: boolean) {
    this._hidden = value;
  }
}
