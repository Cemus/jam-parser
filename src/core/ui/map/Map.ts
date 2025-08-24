import { ActionType } from "../../characters/ActionType";
import type Character from "../../characters/Character";
import type Game from "../../Game";
import type { GameObject } from "../../objects/GameObject";
import { Container } from "../../objects/openable/containers/Container";
import AStar, { type Point } from "./aStar";
import type { Room } from "./Room";

export default class Map {
  private _room: Room;
  private _container: HTMLElement = document.getElementsByTagName(
    "main"
  )[0] as HTMLElement;
  private _aStar: AStar;
  private _characters: Character[];
  private _currentCharacter: Character;

  constructor(
    room: Room,
    characters: Character[],
    currentCharacter: Character
  ) {
    this._room = room;
    this._characters = characters;
    this._aStar = new AStar(this.room);
    this._currentCharacter = currentCharacter;
  }

  renderRoom() {
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
          console.log(c.object);
          if (c.object?.hidden) {
            console.log(c.object?.hidden);
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
          this.highlightCell(cellEl, { x: x, y: y }, this.currentCharacter);
        }

        rowEl.appendChild(cellEl);
      });

      this._container.appendChild(rowEl);
    });
  }

  updateCurrentCharacter(character: Character): this {
    this.currentCharacter = character;
    return this;
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

  haveSamePosition(p1: Point, p2: Point): boolean {
    if (p1.x === p2.x && p1.y === p2.y) {
      return true;
    }
    return false;
  }

  observeSurroundings(character: Character): string[] {
    const observations: string[] = [];

    this.room.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (
          this.areAdjacent(character.position, { x, y }) ||
          this.haveSamePosition(character.position, { x, y })
        ) {
          if (cell.object?.hidden) {
            this.revealCell({ x, y });
            this.renderRoom();
            character.reactTo(ActionType.FIND_ITEM);
          }
          if (cell.object) {
            observations.push(cell.object.observe());
          }
        }
      });
    });

    return observations;
  }

  getObjectsAround(
    character: Character
  ): { object: GameObject; position: Point }[] {
    const found: { object: GameObject; position: Point }[] = [];

    this.room.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (
          this.areAdjacent(character.position, { x, y }) ||
          this.haveSamePosition(character.position, { x, y })
        ) {
          if (cell.object && !cell.object.hidden) {
            found.push({ object: cell.object, position: { x, y } });
            if (cell.object instanceof Container) {
              cell.object.children.forEach((child) => {
                found.push({ object: child, position: { x, y } });
              });
            }
          }
        }
      });
    });

    return found;
  }

  removeObject(cellPosition: Point) {
    const { x, y } = cellPosition;
    const cell = this.room[y]?.[x];
    if (cell) {
      cell.object = null;
      cell.type = "floor";
    }
    this.renderRoom();
  }

  revealCell(cellPosition: Point): void {
    const { x, y } = cellPosition;
    const cell = this.room[y]?.[x];
    if (cell && cell.object) {
      cell.object.hidden = false;
    }
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
      this.renderRoom();
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

  public get currentCharacter(): Character {
    return this._currentCharacter;
  }
  public set currentCharacter(value: Character) {
    this._currentCharacter = value;
  }
}
