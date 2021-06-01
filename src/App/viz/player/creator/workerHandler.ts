// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./data.worker';
import { randomString } from '../../../../shared';

export class WorkerHandler {
  private worker: Worker;
  private cb = (data: any) => { };
  private token = randomString(10);
  constructor() {
    this.worker = new Worker();
    this.register();
  }
  public dispatch = (type: string, cb: any, count: number) => {
    this.token = randomString(10);
    this.worker.postMessage({ type, count, token: this.token });
    this.cb = cb;
  }
  private update = (e: { data: any }) => {
    const { data } = e;
    const { nodes, links, token } = data;
    token === this.token && this.cb({ nodes, links });
  }
  private register = () => {
    this.worker.addEventListener('message', this.update);
  }
}