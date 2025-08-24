import type Game from "../Game";
import Command from "./Command";

export default class DisplayInventoryCommand extends Command {
  keywords: string[] = ["inventaire", "possession"];

  execute(game: Game) {
    const character = game.currentCharacter;

    game.display.log(character.displayInventory(), character);
  }
}
