import { ActionType } from "../characters/ActionType";
import type Character from "../characters/Character";
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

  execute(game: Game, input: string) {
    const lowerInput = input.toLowerCase();
    const character = game.characters.find((c) =>
      lowerInput.includes(c.name.toLowerCase())
    );
    if (!character) return;

    game.currentCharacter = character;
    const text = character.reactTo(ActionType.SUMMON);
    game.display.log(text, character);

    this.resumeParsing(game, input, character);
  }

  resumeParsing(game: Game, input: string, character: Character) {
    const cleanedInput = input
      .toLowerCase()
      .replace(character.name.toLowerCase(), "")
      .trim();

    if (cleanedInput) {
      game.handleInput(cleanedInput);
    }
  }
}
