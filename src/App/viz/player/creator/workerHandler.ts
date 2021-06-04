// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./data.worker';
import { randomString } from '../../../../shared';

export class WorkerHandler {
  private static emptyTask = { token: '', type: '', cb: (data: any) => { }, count: 0 };
  private worker: Worker;
  private task = WorkerHandler.emptyTask;
  constructor() {
    this.worker = new Worker();
    this.register();
  }
  public dispatch = (type: string, cb: any, count: number) => {
    const token = randomString(10);
    if (this.task.token === '') {
      this.worker.postMessage({ type, count, token });
    }
    this.task = { token, type, cb, count };
  }
  private run = () => {
    const { token, type, count } = this.task;
    this.worker.postMessage({ type, count, token });
  }
  private update = (e: { data: any }) => {
    const { data: { nodes, links, token } } = e;
    if (token === this.task.token) {
      this.task.cb({ nodes, links });
      this.task = WorkerHandler.emptyTask;
    } else {
      this.run();
    }
  }
  private register = () => {
    this.worker.addEventListener('message', this.update);
  }
}