import { GameObject } from "../GameObject";
import type { LockType } from "../LockType";

export default abstract class Openable extends GameObject {
  protected _lock: LockType | null;

  constructor(name: string, lock?: LockType) {
    super(name);
    this._lock = lock ?? null;
  }

  isLocked(): boolean {
    return this.lock !== null;
  }

  unlock(): string {
    if (this.lock) {
      this.lock = null;
      return `${this.name} a été déverrouillé(e).`;
    }
    return `${this.name} est déjà ouvert(e).`;
  }

  public get lock(): LockType | null {
    return this._lock;
  }
  public set lock(value: LockType | null) {
    this._lock = value;
  }
}
