import type { Item } from "../objects/items/Item";

export default class Inventory {
  private _items: Item[];

  constructor(items?: Item[]) {
    this._items = items ?? [];
  }

  add(item: Item) {
    this.items.push(item);
  }

  remove(itemToRemove: Item) {
    for (let index = 0; index < this.items.length; index++) {
      const item = this.items[index];
      if (item === itemToRemove) {
        this.items.splice(index, 1);
      }
    }
  }

  public get items(): Item[] {
    return this._items;
  }
  public set items(value: Item[]) {
    this._items = value;
  }
}
