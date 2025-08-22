import type { Room } from "./Room";

export const rooms: Room[] = [
  [
    //0
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
      { name: "Porte D", type: "door", isOpen: false, walkable: false },
      { name: "Vide", type: "empty", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      { name: "Vide", type: "empty", walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Clé", type: "object", hidden: true, walkable: true },
      { name: "Bureau", type: "object", walkable: false },
      { name: "Vide", type: "empty", walkable: false },
    ],
    [
      { name: "Porte B", type: "door", isOpen: false, walkable: false },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Sol", type: "floor", walkable: true },
      { name: "Porte C", type: "door", isOpen: true, walkable: false },
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
      { name: "Porte a", type: "door", isOpen: false, walkable: false },
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
      { name: "Porte B", type: "door", isOpen: false, walkable: false },
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
