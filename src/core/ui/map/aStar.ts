import type Character from "../../characters/Character";
import type { Cell } from "./Cell";

export type Point = { x: number; y: number };

export default class AStar {
  private grid: Cell[][];

  constructor(grid: Cell[][]) {
    this.grid = grid;
  }

  private heuristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private inBounds(x: number, y: number): boolean {
    if (y < 0 || x < 0 || y >= this.grid.length || x >= this.grid[0].length) {
      return false;
    }
    return true;
  }

  private isWalkable(x: number, y: number, characters: Character[]): boolean {
    if (!this.inBounds(x, y)) return false;

    const cell = this.grid[y][x];

    if (!cell.walkable) return false;

    if (characters.some((c) => c.position.x === x && c.position.y === y)) {
      return false;
    }

    return true;
  }

  findPathToTarget(
    start: Point,
    target: Point,
    characters: Character[]
  ): Point[] {
    if (!this.inBounds(target.x, target.y)) return [];

    if (this.isWalkable(target.x, target.y, characters)) {
      return this.findPath(start, target, characters);
    }

    const candidates: Point[] = [
      { x: target.x + 1, y: target.y },
      { x: target.x - 1, y: target.y },
      { x: target.x, y: target.y + 1 },
      { x: target.x, y: target.y - 1 },
    ].filter(
      (n) => this.inBounds(n.x, n.y) && this.isWalkable(n.x, n.y, characters)
    );

    if (candidates.length === 0) return [];

    let bestPath: Point[] = [];
    let bestLen = Infinity;

    for (const candidate of candidates) {
      const path = this.findPath(start, candidate, characters);
      if (path.length > 0 && path.length < bestLen) {
        bestPath = path;
        bestLen = path.length;
      }
    }

    return bestPath;
  }

  findPath(start: Point, goal: Point, characters: Character[]): Point[] {
    const openSet: Point[] = [start];
    const cameFrom: Map<string, Point> = new Map();

    const gScore: Map<string, number> = new Map();
    const fScore: Map<string, number> = new Map();

    const key = (p: Point) => `${p.x},${p.y}`;

    gScore.set(key(start), 0);
    fScore.set(key(start), this.heuristic(start, goal));

    while (openSet.length > 0) {
      let current = openSet.reduce((a, b) =>
        (fScore.get(key(a)) ?? Infinity) < (fScore.get(key(b)) ?? Infinity)
          ? a
          : b
      );

      if (current.x === goal.x && current.y === goal.y) {
        const path: Point[] = [];
        let temp: Point | undefined = current;
        while (temp) {
          path.push(temp);
          temp = cameFrom.get(key(temp));
        }
        return path.reverse();
      }

      openSet.splice(
        openSet.findIndex((p) => p.x === current.x && p.y === current.y),
        1
      );

      const neighbors: Point[] = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 },
      ].filter(
        (n) =>
          this.isWalkable(n.x, n.y, characters) ||
          (n.x === goal.x && n.y === goal.y)
      );

      for (const neighbor of neighbors) {
        const tentativeG = (gScore.get(key(current)) ?? Infinity) + 1;

        if (tentativeG < (gScore.get(key(neighbor)) ?? Infinity)) {
          cameFrom.set(key(neighbor), current);
          gScore.set(key(neighbor), tentativeG);
          fScore.set(
            key(neighbor),
            tentativeG + this.heuristic(neighbor, goal)
          );

          if (!openSet.some((p) => p.x === neighbor.x && p.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return [];
  }
}
