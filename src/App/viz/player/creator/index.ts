import { Player } from "..";
import { createFDT } from "./force-directed-tree";
import { createFDG } from "./force-directed-graph";
import { createDFDG } from "./disjoint-force-directed-graph";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./test.worker';

export const table: { [prop: string]: (player: Player) => void } = {
  'force-directed-tree': createFDT,
  'force-directed-graph': createFDG,
  'disjoint-force-directed-graph': createDFDG,
}

class WorkerHandler {
  private worker: Worker;
  private cb: any;
  constructor() {
    this.worker = new Worker();
    this.register();
  }
  public dispatch = (type: string, cb: any, player: Player) => {
    this.worker.postMessage({ type, count: 10 });
    this.cb = (d: any) => cb(player, d);
  }
  private update = (e: any) => {
    console.log(e.data);
    this.cb(e.data);
  }
  private register = () => {
    this.worker.addEventListener('message', this.update);
  }
}
const workderHandler = new WorkerHandler();

export class PlayerCreator {
  public static create = (type: string, player: Player) => {
    if (type in table) {
      const creator = table[type];
      workderHandler.dispatch(type, creator, player);
      // creator(player);
    }
  }
}