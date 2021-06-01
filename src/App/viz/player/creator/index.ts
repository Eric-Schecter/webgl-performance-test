import { Player } from "..";
import { createFDT, createFDG, createDFDG } from "./recipes";
import { WorkerHandler } from "./workerHandler";

export const table: { [prop: string]: (player: Player, data: any) => void } = {
  'force-directed-tree': createFDT,
  'force-directed-graph': createFDG,
  'disjoint-force-directed-graph': createDFDG,
}

export class PlayerCreator {
  private static workderHandler = new WorkerHandler();
  public create = (type: string, player: Player, n: number) => {
    if (type in table) {
      const creator = table[type];
      const cb = (data: any) => creator(player, data);
      PlayerCreator.workderHandler.dispatch(type, cb, n);
    }
  }
  public update = (type: string, player: Player, n: number) => {
    const cb = (data: any) => player.setData(data).reset();
    PlayerCreator.workderHandler.dispatch(type, cb, n)
  }
}