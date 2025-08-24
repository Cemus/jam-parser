import { Desk } from "../../objects/containers/Desk";
import { Drawer } from "../../objects/containers/Drawer";
import { Door } from "../../objects/doors/Door";
import { ColoredKey } from "../../objects/items/keys/ColoredKey";
import { SmallKey } from "../../objects/items/keys/SmallKey";
import type { Room } from "./Room";

export const rooms: Room[] = [
  [
    //0
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
      {
        name: "Porte D",
        type: "door",
        walkable: false,
        object: new Door("porte D", "magenta"),
      },
      { name: "Vide", type: "empty", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      {
        name: "Clé",
        type: "object",
        walkable: true,
        object: new SmallKey(true),
      },
      {
        name: "Bureau",
        type: "object",
        walkable: false,
        object: new Desk([
          new Drawer([new ColoredKey("rouge")], "smallKey", true),
        ]),
      },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      {
        name: "Porte B",
        type: "door",
        walkable: false,
        object: new Door("porte A", "rouge"),
      },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      {
        name: "Porte C",
        type: "door",
        walkable: false,
        object: new Door("porte C"),
      },
    ],
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
      {
        name: "Porte a",
        type: "door",
        walkable: false,
        object: new Door("porte A", "bleue"),
      },
      { name: "Vide", type: "empty", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
    ],
  ],
  //1
  [
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      { name: "Porte B", type: "door", walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      {
        name: "Porte B",
        type: "door",
        walkable: false,
        object: new Door("porte B", "verte"),
      },
    ],
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Vide", type: "empty", walkable: false },
    ],
  ],
];
