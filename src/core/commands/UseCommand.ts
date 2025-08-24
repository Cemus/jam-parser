import type Character from "../characters/Character";
import type Game from "../Game";
import { Item } from "../objects/items/Item";
import { Key } from "../objects/items/keys/Key";
import Openable from "../objects/Openable";
import Command from "./Command";

export default class UseCommand extends Command {
  keywords: string[] = ["utilise", "sers-toi de", "sers toi de"];

  execute(game: Game, input: string) {
    const character = game.currentCharacter;

    const parsed = this.parseUse(input);

    if (!parsed) {
      game.display.log(`Je ne sais pas ce que je dois utiliser.`, character);
      return;
    }

    const { itemName, targetName } = parsed;

    const item: Item | null = this.getItemFromInventory(character, itemName);

    if (!item) {
      game.display.log(`Je n'ai pas de "${itemName}".`, character);
      return;
    }

    if (item instanceof Key) {
      this.useKey(game, character, item, targetName);
    } else {
      game.display.log(
        `Je ne sais pas comment utiliser "${itemName}".`,
        character
      );
    }
  }

  private getItemFromInventory(
    character: Character,
    itemName: string
  ): Item | null {
    for (const item of character.inventory.items) {
      if (item.name.toLowerCase() === itemName.toLowerCase()) {
        return item;
      }
    }
    return null;
  }

  private useKey(
    game: Game,
    character: Character,
    key: Key,
    targetName?: string
  ) {
    const nearby = game.map.getObjectsAround(character);

    let chosen = null;

    if (targetName) {
      console.log(nearby);
      chosen = nearby.find(
        ({ object }) =>
          object instanceof Openable &&
          object.name.toLowerCase().includes(targetName.toLowerCase())
      );
      if (!chosen) {
        game.display.log(`Je ne peux pas ouvrir "${targetName}".`, character);
        return;
      }
    } else {
      chosen = nearby.find(({ object }) => object instanceof Openable);
      if (!chosen) {
        game.display.log(`Je ne vois pas d'objet à ouvrir.`, character);
        return;
      }
    }

    const openable = chosen.object as Openable;

    if (!openable.lock) {
      game.display.log(`${openable.name} est déjà ouvert.`, character);
      return;
    }

    for (const unlock of key.unlocks) {
      if (openable.lock === unlock) {
        openable.unlock();

        game.display.log(
          `${openable.genre === "masculine" ? "Le" : "La"} ${
            openable.name
          } est maintenant déverrouillé${
            openable.genre === "feminine" ? "e" : ""
          }.`,
          character
        );

        if (key.consumable) {
          character.inventory.remove(key);

          game.display.log(
            `${character.name} n'a plus ${
              key.genre === "masculine" ? "le" : "la"
            } ${key.name} dans son inventaire.`
          );
        }
        return;
      }
    }

    game.display.log(
      `${openable.name} ne peut être déverrouillé avec ${key.name}.`,
      character
    );
  }

  protected parseUse(
    input: string
  ): { itemName: string; targetName?: string } | null {
    const withoutKeyword = this.keywords
      .map((k) => input.toLowerCase().replace(k, "").trim())
      .find((s) => s !== input.toLowerCase());

    if (!withoutKeyword) return null;

    const parts = withoutKeyword.split(/\s+(?:avec|sur|dans)\s+/);
    const itemName = parts[0].trim();
    const targetName = parts[1]?.trim();

    return { itemName, targetName };
  }
}
