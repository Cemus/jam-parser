import { ActionType } from "../characters/ActionType";
import type Character from "../characters/Character";
import type Game from "../Game";
import Command from "./Command";

export default class ObserveCommand extends Command {
  keywords: string[] = ["regarde", "observe", "inspecte", "examine"];

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

    const object = chosen.object;

    const description = object.examine();
    game.display.log(description, character);
  }
}
