import { dialogues } from "../dialogues/dialogues";
import type { Point } from "../ui/map/aStar";
import type { ActionType } from "./ActionType";
import type Stats from "./Stats";

export default class Character {
  private _name: string;
  private _stats: Stats;
  private _avatar: string;
  private _position: Point;

  constructor(name: string, stats: Stats, avatar: string, position: Point) {
    this._name = name;
    this._stats = stats;
    this._avatar = avatar;
    this._position = position;
  }

  reactTo(action: ActionType): string {
    const lines = dialogues[this.name]?.[action] ?? ["…"];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get stats(): Stats {
    return this._stats;
  }
  public set stats(value: Stats) {
    this._stats = value;
  }

  public get avatar(): string {
    return this._avatar;
  }
  public set avatar(value: string) {
    this._avatar = value;
  }

  public get position(): Point {
    return this._position;
  }
  public set position(value: Point) {
    this._position = value;
  }
}
