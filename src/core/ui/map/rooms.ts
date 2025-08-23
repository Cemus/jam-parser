import {
  ColoredKey,
  Desk,
  Door,
  Drawer,
  SmallKey,
} from "../../objects/GameObject";
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
        isOpen: false,
        walkable: false,
        object: new Door("Porte D", "magenta"),
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
        hidden: true,
        walkable: true,
        object: new SmallKey(),
      },
      {
        name: "Bureau",
        type: "object",
        walkable: false,
        object: new Desk([new Drawer([new ColoredKey("rouge")])]),
      },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      {
        name: "Porte B",
        type: "door",
        isOpen: false,
        walkable: false,
        object: new Door("Porte A", "rouge"),
      },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      {
        name: "Porte C",
        type: "door",
        isOpen: true,
        walkable: false,
        object: new Door("Porte C", null),
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
        isOpen: false,
        walkable: false,
        object: new Door("Porte A", "bleue"),
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
      { name: "Porte B", type: "door", isOpen: false, walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      {
        name: "Porte B",
        type: "door",
        isOpen: false,
        walkable: false,
        object: new Door("Porte B", "verte"),
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
