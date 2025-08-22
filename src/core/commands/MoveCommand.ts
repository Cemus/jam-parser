import { ActionType } from "../characters/ActionType";
import type Character from "../characters/Character";
import type Game from "../Game";
import type { Point } from "../ui/map/aStar";
import type { Room } from "../ui/map/Room";
import type Command from "./Command";

export default class MoveCommand implements Command {
  matches(input: string): boolean {
    return this.isMovementCommand(input);
  }

  execute(game: Game) {
    const lowerInput = game.parser.input.value.toLowerCase();
    const character = game.currentCharacter;

    let newPos: Point | null = null;

    newPos = this.cardinalMovement(lowerInput, character);

    if (!newPos) {
      newPos = this.moveTowards(lowerInput, game);
    }
    if (newPos) {
      if (game.map.canMoveCharacter(character, newPos)) {
        const text = character.reactTo(ActionType.MOVE);
        game.map.moveCharacter(character, newPos, game);
        game.display.log(text, character);
      } else {
        const text = character.reactTo(ActionType.CANT_MOVE);
        game.display.log(text, character);
      }
    } else {
      game.display.log(character.reactTo(ActionType.UNKNOWN), character);
    }
  }

  private isMovementCommand(input: string): boolean {
    const keywords = [
      "avance",
      "nord",
      "recule",
      "sud",
      "droite",
      "l'est",
      "gauche",
      "l'ouest",
      "va vers",
      "va à",
      "va au",
      "va en",
    ];
    return keywords.some((word) => input.toLowerCase().includes(word));
  }

  private cardinalMovement(input: string, character: Character): Point | null {
    if (
      input.includes("nord") ||
      input.includes("haut") ||
      input.includes("avance")
    ) {
      return { x: character.position.x, y: character.position.y - 1 };
    } else if (
      input.includes("sud") ||
      input.includes("bas") ||
      input.includes("recule")
    ) {
      return { x: character.position.x, y: character.position.y + 1 };
    } else if (input.includes("est") || input.includes("droite")) {
      return { x: character.position.x + 1, y: character.position.y };
    } else if (input.includes("ouest") || input.includes("gauche")) {
      return { x: character.position.x - 1, y: character.position.y };
    }

    return null;
  }

  private moveTowards(input: string, game: Game): Point | null {
    const targetWords = [
      "porte a",
      "porte b",
      "porte c",
      "porte d",
      "bureau",
      "clé",
      "coffre",
    ];
    const match = targetWords.find((word) => input.includes(word));

    if (match) {
      console.log("match");
      return this.findObjectPosition(game.map.room, match);
    }

    return null;
  }

  private findObjectPosition(room: Room, name: string): Point | null {
    for (let y = 0; y < room.length; y++) {
      for (let x = 0; x < room[y].length; x++) {
        if (room[y][x].name.toLowerCase().includes(name.toLowerCase())) {
          console.log(x, y);
          return { x, y };
        }
      }
    }
    return null;
  }
}
