export const ActionType = {
  OPEN_DOOR: "OPEN_DOOR",
  SUMMON: "SUMMON",
  ATTACK: "ATTACK",
  MOVE: "MOVE",
  ARRIVED: "ARRIVED",
  CANT_MOVE: "CANT_MOVE",
  OBSERVE: "OBSERVE",
  OBSERVE_FAIL: "OBSERVE_FAIL",
  FIND_ITEM: "FIND_ITEM",
  EXAMINE: "EXAMINE",
  UNKNOWN: "UNKNOWN",
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];
