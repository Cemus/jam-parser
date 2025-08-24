import type Game from "../Game";
import { Container } from "../objects/openable/containers/Container";
import { Door } from "../objects/openable/doors/Door";
import Openable from "../objects/openable/Openable";
import type Command from "./Command";

export default class OpenCommand implements Command {
  matches(input: string): boolean {
    return this.isOpenCommand(input);
  }

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

    if (chosen.object instanceof Openable) {
      const objectToOpen = chosen.object;

      if (objectToOpen.isLocked()) {
        game.display.log(`C'est verrouillé.`, character);
        return;
      }

      if (objectToOpen instanceof Container) {
        objectToOpen.displayContent();
      } else if (objectToOpen instanceof Door) {
        game.changeRoom();
      }
    }
  }

  private parseItemName(input: string): string | null {
    const words = input.toLowerCase().split(" ");
    if (words.length > 1) {
      return words.slice(1).join(" ");
    }
    return null;
  }

  private isOpenCommand(input: string): boolean {
    const keywords = ["ouvre"];
    return keywords.some((word) => input.toLowerCase().includes(word));
  }
}
