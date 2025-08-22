import Character from "./characters/Character";
import Stats from "./characters/Stats";
import type Command from "./commands/Command";
import OpenDoorCommand from "./commands/OpenDoorCommand";
import SummonCommand from "./commands/SummonCommand";
import Display from "./ui/Display";
import { rooms } from "./ui/map/rooms";
import Parser from "./ui/Parser";
import Map from "./ui/map/Map";
import { ActionType } from "./characters/ActionType";
import MoveCommand from "./commands/MoveCommand";

export default class Game {
  private _characters: Character[];
  private _currentCharacter: Character;
  private _parser: Parser = new Parser(this);
  private _display: Display = new Display();
  private _commands: Command[] = [
    new SummonCommand(),
    new OpenDoorCommand(),
    new MoveCommand(),
  ];
  private _map: Map;

  constructor() {
    this._characters = [
      new Character("Anna", new Stats(5, 3, 5, 6, 5, 2), "/avatars/anna.png", {
        x: 1,
        y: 3,
      }),
      new Character("Paul", new Stats(6, 2, 7, 4, 7, 1), "/avatars/paul.png", {
        x: 2,
        y: 3,
      }),
    ];
    this._map = new Map(rooms[0], this.characters);
    this._currentCharacter = this.characters[0];
  }

  init() {
    this.parser.init();
    this.display.init().updateCurrentCharacter(this.currentCharacter);
    this.map.renderRoom(this.currentCharacter);
  }

  handleInput(input: string) {
    let match = false;
    for (const cmd of this._commands) {
      if (cmd.matches(input, this)) {
        cmd.execute(this, input);
        match = true;
      }
    }

    if (!match)
      this.display.log(
        this.currentCharacter.reactTo(ActionType.UNKNOWN),
        this.currentCharacter
      );
  }
  public get characters(): Character[] {
    return this._characters;
  }
  public set characters(value: Character[]) {
    this._characters = value;
  }

  public get currentCharacter(): Character {
    return this._currentCharacter;
  }
  public set currentCharacter(value: Character) {
    this._currentCharacter = value;
    this.display.updateCurrentCharacter(this.currentCharacter);
    this.map.renderRoom(this.currentCharacter);
  }

  public get parser(): Parser {
    return this._parser;
  }
  public set parser(value: Parser) {
    this._parser = value;
  }

  public get display(): Display {
    return this._display;
  }
  public set display(value: Display) {
    this._display = value;
  }

  public get commands(): Command[] {
    return this._commands;
  }
  public set commands(value: Command[]) {
    this._commands = value;
  }

  public get map(): Map {
    return this._map;
  }
  public set map(value: Map) {
    this._map = value;
  }
}
