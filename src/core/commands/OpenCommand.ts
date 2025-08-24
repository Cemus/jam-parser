import type Game from "../Game";
import { Door } from "../objects/doors/Door";
import Openable from "../objects/Openable";
import { OpenableContainer } from "../objects/OpenableContainer";

import Command from "./Command";

export default class OpenCommand extends Command {
  keywords: string[] = ["ouvre"];

  execute(game: Game, input: string) {
    const character = game.currentCharacter;
    const itemName = this.parseItemName(input);

    const nearby = game.map.getObjectsAround(character);

    if (nearby.length === 0) {
      game.display.log("Je ne peux rien ouvrir d'ici.", character);
      return;
    }

    let chosen = null;

    if (itemName) {
      chosen = nearby.find(({ object }) =>
        object.name.toLowerCase().includes(itemName)
      );
      if (!chosen) {
        game.display.log(
          `Je ne vois pas de "${itemName}" à ouvrir.`,
          character
        );
        return;
      }
    } else {
      if (nearby.length > 1) {
        const list = nearby.map(({ object }) => object.name).join(", ");
        game.display.log(`Que dois-je ouvrir ? (${list})`, character);
        return;
      }
      chosen = nearby[0];
    }

    if (
      !(chosen.object instanceof Openable) &&
      !(chosen.object instanceof OpenableContainer)
    ) {
      game.display.log(
        `${chosen.object.genre === "masculine" ? "Le" : "La"} ${
          chosen.object.name
        } ne s'ouvre pas.`,
        character
      );
      return;
    }

    const objectToOpen = chosen.object;
    if (objectToOpen.isLocked()) {
      game.display.log(`C'est verrouillé.`, character);
      return;
    }

    if (objectToOpen instanceof OpenableContainer) {
      console.log("s'apprête à ou vri");
      objectToOpen.open();
      game.display.log(`${objectToOpen.displayContent()}`, character);
      return;
    } else if (objectToOpen instanceof Door) {
      game.changeRoom();
      return;
    }
  }

  private parseItemName(input: string): string | null {
    const words = input.toLowerCase().split(" ");
    if (words.length > 1) {
      return words.slice(1).join(" ");
    }
    return null;
  }
}
