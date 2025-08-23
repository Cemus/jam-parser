import type { Key } from "./items/keys/Key";
import type { LockType } from "./LockType";

export interface Lockable {
  lock: LockType | null;
  unlock(key: Key): string;
}
