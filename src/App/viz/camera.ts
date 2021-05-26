import { PerspectiveCamera, OrthographicCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class MyCamera {
  private _instance: PerspectiveCamera | OrthographicCamera;
  private _control: OrbitControls;
  constructor(private canvas: HTMLCanvasElement) {
    const { offsetWidth: width, offsetHeight: height } = canvas;
    this._instance = new PerspectiveCamera(75, width / height, 0.1, 10000);
    // this._instance = new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 10000);
    this._instance.position.set(0, 0, 200);
    this._control = this.createControl();
  }
  private createControl = () => {
    const control = new OrbitControls(this._instance, this.canvas);
    control.enableDamping = true;
    control.enabled = false;
    return control;
  }
  public init = (is2d: boolean) => {
    this._control.enableRotate = !is2d;
    this._control.reset();
  }
  public dispose = () => {
    this._control.dispose();
  }
  public get control() {
    return this._control;
  }
  public get instance() {
    return this._instance;
  }
}