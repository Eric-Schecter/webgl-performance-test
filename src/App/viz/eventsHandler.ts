import { Vector3 } from "three";
import { Picker } from "./picker";
import { Player } from "./player";
import { MyCamera } from "./camera";

enum Click {
  LeftClick = 0,
  RightClick = 2,
}

class ViewPort {
  private startPosMouse = new Vector3();
  private startPosCamera = new Vector3();
  constructor(private mouse: Vector3, private camera: MyCamera) { }
  public start = () => {
    this.startPosMouse.copy(this.mouse);
    this.startPosCamera.copy(this.camera.instance.position);
  }
  public update = () => {
    const p = new Vector3().copy(this.mouse).sub(this.startPosMouse).multiplyScalar(-1);
    p.y = -p.y;
    p.z = 0;
    this.camera.instance.position.copy(new Vector3().copy(this.startPosCamera).add(p));
    const { x, y } = this.camera.instance.position;
    this.camera.control.target.set(x, y, 0);
  }
  public end = () => {
    this.startPosMouse.set(-10000, -10000, 0);
    this.startPosCamera.set(-10000, -10000, 0);
  }
}

export class EventsHandler {
  private _mouse = new Vector3();
  private viewport: ViewPort;
  constructor(private canvas: HTMLCanvasElement, private picker: Picker,
    private camera: MyCamera, private player: Player) {
    this.viewport = new ViewPort(this._mouse, camera);
    this.init();
    this.register();
  }
  private init = () => {
    this._mouse.set(-10000, -10000, 0);
    this.viewport.end();
  }
  private move = (x: number, y: number) => {
    this._mouse.x = x;
    this._mouse.y = y;
    this._mouse.z = this.camera.instance.position.z;
  }
  private mousedown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    this._mouse.x = clientX;
    this._mouse.y = clientY;
    if (e.button === Click.LeftClick) {
      this.leftdown();
    } else if (e.button === Click.RightClick) {
      this.rightdown();
    }
  }
  private touchdown = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    this._mouse.x = clientX;
    this._mouse.y = clientY;
    this.leftdown()
  }
  private mousemove = ({ clientX, clientY }: MouseEvent) => {
    this.move(clientX, clientY);
  }
  private touchmove = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    this.move(clientX, clientY)
  }
  private rightdown = () => {
    this.viewport.start();
    window.addEventListener('pointermove', this.moveviewport);
    window.addEventListener('pointerup', this.up);
    //todo: add touchmove event
  }
  private leftdown = () => {
    const res = this.picker.pick(this._mouse);
    if (res) {
      this.camera.control.enabled = false;
    }

    window.addEventListener('pointermove', this.mousemove);
    window.addEventListener('pointerup', this.up);

    window.addEventListener('touchmove', this.touchmove, { passive: true });
    window.addEventListener('touchend', this.up);
  }
  private up = () => {
    this.init();
    this.picker.init();
    this.camera.control.enabled = true;
    this.player.updatePoint(-1, 0, 0);
    window.removeEventListener('pointermove', this.mousemove);
    window.removeEventListener('pointerup', this.up);
    window.removeEventListener('pointermove', this.moveviewport);

    window.removeEventListener('touchmove', this.touchmove);
    window.removeEventListener('touchend', this.up);
    //todo add touchmove event for moveviewport
  }
  private moveviewport = ({ clientX, clientY }: MouseEvent) => {
    this.move(clientX, clientY);
    this.viewport.update();
  }
  private contextmenu = (e: MouseEvent) => {
    if (e.button === Click.RightClick) {
      e.preventDefault();
      return false;
    }
  }
  private register = () => {
    this.canvas.addEventListener('pointerdown', this.mousedown);
    this.canvas.addEventListener('touchstart', this.touchdown, { passive: true });
    this.canvas.addEventListener('contextmenu', this.contextmenu);
  }
  public unregister = () => {
    this.canvas.removeEventListener('pointerdown', this.mousedown);
    this.canvas.removeEventListener('touchstart', this.touchdown);
    this.canvas.removeEventListener('contextmenu', this.contextmenu);
  }
  public get mouse() {
    return this._mouse;
  }
  public get mouseNormalized() {
    return new Vector3(
      this.mouse.x / this.canvas.clientWidth * 2 - 1,
      -(this.mouse.y / this.canvas.clientHeight) * 2 + 1,
      0,
    );
  }
}