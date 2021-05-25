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
  constructor(private player: Player) { }
  public create = (type: string) => {
    if (type in table) {
      const creator = table[type];
      creator(this.player);
    }
  }
}