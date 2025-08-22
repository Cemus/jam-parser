import type Game from "../Game";

export default interface Command {
  matches(input: string, game?: Game): boolean;
  execute(game: Game, input?: string): void;
}
