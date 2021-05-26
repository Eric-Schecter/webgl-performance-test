import { Player } from "..";
import { createFDT } from "./force-directed-tree";
import { createFDG } from "./force-directed-graph";
import { createDFDG } from "./disjoint-force-directed-graph";

export const table: { [prop: string]: (player: Player) => void } = {
  'force-directed-tree': createFDT,
  'force-directed-graph': createFDG,
  'disjoint-force-directed-graph': createDFDG,
}

export class PlayerCreator {
  public static create = (type: string, player: Player) => {
    if (type in table) {
      const creator = table[type];
      creator(player);
    }
  }
}