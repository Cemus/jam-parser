import type Game from "../Game";

export default class Parser {
  private _button: HTMLButtonElement = document.querySelector(
    "#parse"
  ) as HTMLButtonElement;
  private _input: HTMLInputElement = document.querySelector(
    "#parser"
  ) as HTMLInputElement;
  private _game: Game;

  constructor(game: Game) {
    this._game = game;
  }

  init() {
    this.input?.addEventListener("keyup", () => {
      if (this.input && this._button) {
        this.input.value === ""
          ? (this._button.disabled = true)
          : (this._button.disabled = false);
      }
    });

    this.input?.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && !this._button?.disabled) {
        this._button?.click();
      }
    });

    this.button?.addEventListener("click", () => {
      this.parse();
    });
  }

  parse() {
    const sanitizedInput = this.input.value.trim();
    if (sanitizedInput !== "") {
      this._game.handleInput(sanitizedInput);
    }

    this.input.value = "";
    this._button.disabled = true;
  }

  public get button(): HTMLButtonElement {
    return this._button;
  }
  public set button(value: HTMLButtonElement) {
    this._button = value;
  }

  public get input(): HTMLInputElement {
    return this._input;
  }
  public set input(value: HTMLInputElement) {
    this._input = value;
  }

  public get game(): Game {
    return this._game;
  }
  public set game(value: Game) {
    this._game = value;
  }
}
