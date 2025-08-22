import type Character from "../characters/Character";

export default class Display {
  private _avatar: HTMLImageElement = document.getElementById(
    "avatar"
  ) as HTMLImageElement;
  private _name: HTMLParagraphElement = document.getElementById(
    "name"
  ) as HTMLParagraphElement;
  private _dialogBox: HTMLUListElement = document.getElementById(
    "dialogBox"
  ) as HTMLUListElement;

  private _headerMenus: HTMLUListElement[] = [
    document.getElementById("mainMenu") as HTMLUListElement,
    document.getElementById("statusMenu") as HTMLUListElement,
    document.getElementById("documentsMenu") as HTMLUListElement,
  ];
  private _currentScreen: string = "main";

  init(): this {
    this.changeScreen();
    this.headerMenus.forEach((menu) => {
      menu.addEventListener("click", () => {
        this.currentScreen = menu.id.split("Menu")[0];
      });
    });
    return this;
  }

  changeScreen() {
    this._headerMenus.forEach((menu) => {
      menu.className = "menu";
    });
    switch (this.currentScreen) {
      case "main":
        this._headerMenus[0].className = "menu-highlighted";
        break;
      case "status":
        this._headerMenus[1].className = "menu-highlighted";

        break;
      case "documents":
        this._headerMenus[2].className = "menu-highlighted";
        break;
      default:
        break;
    }
  }
  updateCurrentCharacter(character: Character): this {
    this.avatar.src = character.avatar;
    this.avatar.alt = character.name;
    this.name.textContent = character.name;
    return this;
  }

  log(text: string, speaker?: Character) {
    const listElement = document.createElement("li");
    listElement.textContent = speaker ? `${speaker.name} : ${text}` : text;
    this.dialogBox.appendChild(listElement);
    this.dialogBox.scrollTop = this.dialogBox.scrollHeight;
  }

  public get avatar(): HTMLImageElement {
    return this._avatar;
  }
  public set avatar(value: HTMLImageElement) {
    this._avatar = value;
  }

  public get name(): HTMLParagraphElement {
    return this._name;
  }
  public set name(value: HTMLParagraphElement) {
    this._name = value;
  }

  public get dialogBox(): HTMLUListElement {
    return this._dialogBox;
  }
  public set dialogBox(value: HTMLUListElement) {
    this._dialogBox = value;
  }

  public get currentScreen(): string {
    return this._currentScreen;
  }
  public set currentScreen(value: string) {
    this._currentScreen = value;
    this.changeScreen();
  }

  public get headerMenus(): HTMLUListElement[] {
    return this._headerMenus;
  }
  public set headerMenus(value: HTMLUListElement[]) {
    this._headerMenus = value;
  }
}
