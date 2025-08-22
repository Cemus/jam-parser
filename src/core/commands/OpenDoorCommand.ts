import { ActionType } from "../characters/ActionType";
import type Game from "../Game";
import type Command from "./Command";

export default class OpenDoorCommand implements Command {
  matches(input: string): boolean {
    return input.toLowerCase().includes("ouvrir porte");
  }

  execute(game: Game): void {
    const currentCharacter = game.currentCharacter;
    const text = currentCharacter.reactTo(ActionType.OPEN_DOOR);

    game.display.log(text, currentCharacter);
  }
}
