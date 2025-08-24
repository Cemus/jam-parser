import { GameObject } from "./GameObject";
import type { LockType } from "./LockType";

export default abstract class Openable extends GameObject {
  protected _lock: LockType | null;
  protected _isLocked: boolean;

  constructor(name: string, lock?: LockType, hidden?: boolean) {
    super(name, hidden);
    this._lock = lock ?? null;
    this._isLocked = this.lock !== null;
  }

  isLocked(): boolean {
    return this.lock !== null;
  }

  unlock(): void {
    this.lock = null;
  }

  public get lock(): LockType | null {
    return this._lock;
  }
  public set lock(value: LockType | null) {
    this._lock = value;
  }
}
