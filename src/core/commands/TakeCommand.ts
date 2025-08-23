import type Game from "../Game";
import type { Item } from "../objects/items/Item";
import type Command from "./Command";

export default class TakeCommand implements Command {
  matches(input: string): boolean {
    return this.isTakeCommand(input);
  }

  execute(game: Game, input: string) {
    const character = game.currentCharacter;
    const itemName = this.parseItemName(input);

    const nearby = game.map.getObjectsAround(character);

    if (nearby.length === 0) {
      game.display.log("Il n’y a rien à prendre ici.", character);
      return;
    }

    let chosen = null;

    if (itemName) {
      chosen = nearby.find(({ object }) =>
        object.name.toLowerCase().includes(itemName)
      );
      if (!chosen) {
        game.display.log(
          `Je ne vois pas de "${itemName}" à prendre.`,
          character
        );
        return;
      }
    } else {
      if (nearby.length > 1) {
        const list = nearby.map(({ object }) => object.name).join(", ");
        game.display.log(`Que veux-tu prendre ? (${list})`, character);
        return;
      }
      chosen = nearby[0];
    }

    if ("grab" in chosen.object) {
      const item = chosen.object as Item;

      item.grab();
      character.inventory.push(item);

      game.map.removeObject(chosen.position);
      game.display.log(`${character.name} a pris ${chosen.object.name}.`);
    } else {
      game.display.log(`Je ne peux pas prendre ça.`, character);
    }
  }

  private parseItemName(input: string): string | null {
    const words = input.toLowerCase().split(" ");
    if (words.length > 1) {
      return words.slice(1).join(" ");
    }
    return null;
  }

  private isTakeCommand(input: string): boolean {
    const keywords = ["prends", "attrape", "chope", "ramasse"];
    return keywords.some((word) => input.toLowerCase().includes(word));
  }
}
