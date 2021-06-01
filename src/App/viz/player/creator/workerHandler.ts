// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./data.worker';

export class WorkerHandler {
  private worker: Worker;
  private cb = (data: any) => { };
  constructor() {
    this.worker = new Worker();
    this.register();
  }
  public dispatch = (type: string, cb: any, count: number) => {
    this.worker.postMessage({ type, count });
    this.cb = cb;
  }
  private update = (e: any) => {
    e.data && this.cb(e.data);
  }
  private register = () => {
    this.worker.addEventListener('message', this.update);
  }
}