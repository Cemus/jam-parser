import { ActionType } from "../characters/ActionType";
import type Game from "../Game";
import type Command from "./Command";

export default class ObserveCommand implements Command {
  matches(input: string): boolean {
    return this.isObserveCommand(input);
  }

  execute(game: Game) {
    const character = game.currentCharacter;
    // TO DO
    const text = character.reactTo(ActionType.OBSERVE);
    game.display.log(text, character);
  }

  private isObserveCommand(input: string): boolean {
    const keywords = ["regarde", "observe autour"];
    return keywords.some((word) => input.toLowerCase().includes(word));
  }
}
