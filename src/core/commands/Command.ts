import type Game from "../Game";

export default abstract class Command {
  abstract keywords: string[];

  matches(input: string, _game?: Game): boolean {
    return this.keywords.some((word) => input.toLowerCase().startsWith(word));
  }

  abstract execute(game: Game, input?: string): void;

  protected parseTarget(input: string): string | null {
    const words = input.toLowerCase().split(" ");
    if (words.length > 1) {
      return words.slice(1).join(" ");
    }
    return null;
  }
}
