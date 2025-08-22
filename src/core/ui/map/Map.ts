import { ActionType } from "../../characters/ActionType";
import type Character from "../../characters/Character";
import type Game from "../../Game";
import AStar, { type Point } from "./aStar";
import type { Room } from "./Room";

export default class Map {
  private _room: Room;
  private _container: HTMLElement = document.getElementsByTagName(
    "main"
  )[0] as HTMLElement;
  private _aStar: AStar;
  private _characters: Character[];

  constructor(room: Room, characters: Character[]) {
    this._room = room;
    this._characters = characters;
    this._aStar = new AStar(this.room);
  }

  renderRoom(currentCharacter: Character) {
    this._container.innerHTML = "";

    this.room.forEach((row, y) => {
      const rowEl = document.createElement("div");
      rowEl.className = "row";

      row.forEach((c, x) => {
        const cellEl = document.createElement("div");
        cellEl.classList.remove("cell-highlight");

        const character = this.characters.find(
          (char) => char.position.x === x && char.position.y === y
        );

        if (character) {
          cellEl.className = "cell character";
          cellEl.textContent = character.name;
          cellEl.title = character.name;
        } else {
          if (c.hidden) {
            cellEl.className = "cell floor";
            cellEl.dataset.name = "floor";
            cellEl.title = "Sol";
            cellEl.textContent = "";
          } else {
            cellEl.className = `cell ${c.type}`;
            cellEl.dataset.name = c.name;
            if (c.type !== "empty") {
              cellEl.title = c.name;
            }
            cellEl.textContent = this.getCellContent(c.type);
          }
        }

        if (c.type !== "empty") {
          this.highlightCell(cellEl, { x: x, y: y }, currentCharacter);
        }

        rowEl.appendChild(cellEl);
      });

      this._container.appendChild(rowEl);
    });
  }

  highlightCell(
    cellElement: HTMLDivElement,
    cellPosition: Point,
    currentCharacter: Character
  ): void {
    if (this.areAdjacent(currentCharacter.position, cellPosition)) {
      cellElement.classList.add("cell-highlight");
    }
  }

  areAdjacent(p1: Point, p2: Point): boolean {
    if (
      (p1.x + 1 === p2.x && p1.y === p2.y) ||
      (p1.x - 1 === p2.x && p1.y === p2.y) ||
      (p1.y + 1 === p2.y && p1.x === p2.x) ||
      (p1.y - 1 === p2.y && p1.x === p2.x)
    ) {
      return true;
    }
    return false;
  }

  canMoveCharacter(character: Character, goal: Point): boolean {
    const path = this.aStar.findPath(character.position, goal);
    return path.length > 0;
  }

  async moveCharacter(
    character: Character,
    goal: Point,
    game: Game
  ): Promise<void> {
    if (!this.canMoveCharacter(character, goal)) return;

    const path = this.aStar.findPathToTarget(character.position, goal);

    for (const p of path) {
      character.position = p;
      this.renderRoom(character);
      await this.sleep(500);
    }

    game.display.log(character.reactTo(ActionType.ARRIVED), character);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getCellContent(type: string): string {
    switch (type) {
      case "door":
        return "🚪";

      case "wall":
        return "🧱";

      case "object":
        return "📦";

      default:
        return "";
    }
  }

  public get room(): Room {
    return this._room;
  }
  public set room(value: Room) {
    this._room = value;
  }

  public get aStar(): AStar {
    return this._aStar;
  }
  public set aStar(value: AStar) {
    this._aStar = value;
  }

  public get characters(): Character[] {
    return this._characters;
  }
  public set characters(value: Character[]) {
    this._characters = value;
  }
}
