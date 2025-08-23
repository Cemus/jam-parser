import { ActionType } from "../characters/ActionType";
import type Character from "../characters/Character";
import type Game from "../Game";
import type Command from "./Command";

export default class ObserveCommand implements Command {
  matches(input: string): boolean {
    return this.isObserveCommand(input);
  }

  execute(game: Game, input: string) {
    const character = game.currentCharacter;

    const targetName = this.parseTarget(input);

    if (!targetName) {
      this.lookAround(game, character);
      return;
    }

    this.examine(game, character, targetName);
  }

  private lookAround(game: Game, character: Character): void {
    game.display.log(character.reactTo(ActionType.OBSERVE), character);

    const observations = game.map.observeSurroundings(character);

    if (observations.length === 0) {
      game.display.log(character.reactTo(ActionType.OBSERVE_FAIL), character);
      return;
    }

    const text = `Je vois : ${observations.join(", ")}.`;
    game.display.log(text, character);
  }

  private examine(game: Game, character: Character, targetName: string): void {
    const nearby = game.map.getObjectsAround(character);
    const chosen = nearby.find(({ object }) =>
      object.name.toLowerCase().includes(targetName)
    );

    if (!chosen) {
      game.display.log(`Je ne vois pas de "${targetName}" ici.`, character);
      return;
    }

    const description = chosen.object.examine();
    game.display.log(description, character);
  }

  private parseTarget(input: string): string | null {
    const words = input.toLowerCase().split(" ");
    if (words.length > 1) {
      return words.slice(1).join(" ");
    }
    return null;
  }

  private isObserveCommand(input: string): boolean {
    const keywords = ["regarde", "observe", "inspecte", "examine"];
    return keywords.some((word) => input.toLowerCase().startsWith(word));
  }
}
