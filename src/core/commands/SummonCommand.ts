import { ActionType } from "../characters/ActionType";
import type Game from "../Game";
import Command from "./Command";

export default class SummonCommand extends Command {
  keywords: string[] = [];

  override matches(input: string, game: Game): boolean {
    const lowerInput = input.toLowerCase();

    return game.characters.some((c) =>
      lowerInput.includes(c.name.toLowerCase())
    );
  }

  execute(game: Game) {
    const lowerInput = game.parser.input.value.toLowerCase();
    const character = game.characters.find((c) =>
      lowerInput.includes(c.name.toLowerCase())
    );

    if (!character) return;

    game.currentCharacter = character;

    const text = character.reactTo(ActionType.SUMMON);
    game.display.log(text, character);
  }
}
