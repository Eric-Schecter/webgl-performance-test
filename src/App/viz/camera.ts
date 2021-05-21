import { PerspectiveCamera } from "three";

export class MyCamera {
  private _instance: PerspectiveCamera;
  constructor(canvas: HTMLCanvasElement) {
    const { offsetWidth: width, offsetHeight: height } = canvas;
    this._instance = new PerspectiveCamera(75, width / height, 0.1, 10000);
    this.init();
  }
  public init = () => {
    this._instance.position.set(0, 0, 200);
    this._instance.lookAt(0, 0, 0);
  }
  public get instance() {
    return this._instance;
  }
}