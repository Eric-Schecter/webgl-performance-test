import { Data as DataFDT } from "../dataHandler/force-directed-tree";
import { Data as DataFDG } from "../dataHandler/force-directed-graph";
import { Data as DataDFDG } from "../dataHandler/disjoint-force-directed-graph";
import { DataHandler } from "../dataHandler";

// eslint-disable-next-line no-restricted-globals
const ctx = self as any;

type DataHandlerConstructor = { new(count: number): DataHandler };

class Handler {
  private map = new Map<string, DataHandler>();
  private table: { [prop: string]: DataHandlerConstructor } = {
    'force-directed-tree': DataFDT,
    'force-directed-graph': DataFDG,
    'disjoint-force-directed-graph': DataDFDG,
  }
  private getFromExist = (type: string, count: number) => {
    const dataHandler = this.map.get(type) as DataHandler;
    dataHandler.reset(count);
    return dataHandler.data;
  }
  private getFromCreated = (type: string, count: number) => {
    const Data = this.table[type];
    const dataHandler = new Data(count);
    this.map.set(type, dataHandler);
    return dataHandler.data;
  }
  public getConstructor = (type: string, count: number) => {
    return this.map.has(type)
      ? this.getFromExist(type, count)
      : this.getFromCreated(type, count);
  }
}
const handler = new Handler();

ctx.addEventListener('message', (e: { data: { type: string, count: number } }) => {
  const { type, count } = e.data;
  const data = handler.getConstructor(type, count);
  ctx.postMessage(data);
})