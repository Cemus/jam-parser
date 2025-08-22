export default class Stats {
  private _constitution: number;
  private _reason: number;

  private _strength: number;
  private _dexterity: number;

  private _intelligence: number;
  private _knowledge: number;

  constructor(
    constitution: number,
    reason: number,
    strength: number,
    dexterity: number,
    intelligence: number,
    knowledge: number
  ) {
    this._constitution = constitution;
    this._reason = reason;
    this._strength = strength;
    this._dexterity = dexterity;
    this._intelligence = intelligence;
    this._knowledge = knowledge;
  }

  public get constitution(): number {
    return this._constitution;
  }
  public set constitution(value: number) {
    this._constitution = value;
  }

  public get reason(): number {
    return this._reason;
  }
  public set reason(value: number) {
    this._reason = value;
  }

  public get strength(): number {
    return this._strength;
  }
  public set strength(value: number) {
    this._strength = value;
  }

  public get dexterity(): number {
    return this._dexterity;
  }
  public set dexterity(value: number) {
    this._dexterity = value;
  }

  public get intelligence(): number {
    return this._intelligence;
  }
  public set intelligence(value: number) {
    this._intelligence = value;
  }

  public get knowledge(): number {
    return this._knowledge;
  }
  public set knowledge(value: number) {
    this._knowledge = value;
  }
}
