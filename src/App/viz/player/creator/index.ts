import { Player } from "..";
import { createFDT } from "./fdt";
import { createFDG } from "./fdg";
import { createDFDG } from "./dfdg";

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