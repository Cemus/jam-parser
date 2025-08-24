export abstract class GameObject {
  private _name: string;
  private _genre?: "masculine" | "feminine";
  private _hidden: boolean;

  constructor(
    name: string,
    hidden?: boolean,
    genre?: "masculine" | "feminine"
  ) {
    this._name = name;
    this._genre = genre;
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

  public get genre(): "masculine" | "feminine" | undefined {
    return this._genre;
  }
  public set genre(value: "masculine" | "feminine" | undefined) {
    this._genre = value;
  }

  public get hidden(): boolean {
    return this._hidden;
  }
  public set hidden(value: boolean) {
    this._hidden = value;
  }
}
