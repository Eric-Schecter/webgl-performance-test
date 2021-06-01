import { Data as DataFDT } from "../dataHandler/force-directed-tree";
import { Data as DataFDG } from "../dataHandler/force-directed-graph";
import { Data as DataDFDG } from "../dataHandler/disjoint-force-directed-graph";
import { DataHandler } from "../dataHandler";

// eslint-disable-next-line no-restricted-globals
const ctx = self as any;

type DataHandlerConstructor = { new(): DataHandler };

class Handler {
  private map = new Map<string, DataHandler>();
  private isLoading = false;
  private preType = '';
  private table: { [prop: string]: DataHandlerConstructor } = {
    'force-directed-tree': DataFDT,
    'force-directed-graph': DataFDG,
    'disjoint-force-directed-graph': DataDFDG,
  }
  private getData = (type: string, count: number) => {
    const dataHandler = this.map.get(type) as DataHandler;
    dataHandler.init(count);
    this.isLoading = false;
    return dataHandler.data;
  }
  private createConstructor = (type: string) => {
    const Data = this.table[type];
    const dataHandler = new Data();
    this.map.set(type, dataHandler);
  }
  private cancel = () => {
    this.map.delete(this.preType);
  }
  public getConstructor = (type: string, count: number) => {
    if (this.isLoading) {
      this.cancel();
    }
    this.isLoading = true;
    this.preType = type;
    if (!this.map.has(type)) {
      this.createConstructor(type)
    }
    return this.getData(type, count);
  }
}
const handler = new Handler();

ctx.addEventListener('message', (e: { data: { type: string, count: number } }) => {
  const { type, count } = e.data;
  const data = handler.getConstructor(type, count);
  ctx.postMessage(data);
})