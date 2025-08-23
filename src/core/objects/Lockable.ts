import type { Key } from "./items/keys/Key";
import type { LockType } from "./LockType";

export interface Lockable {
  locked?: LockType;
  unlock(key: Key): string;
}
