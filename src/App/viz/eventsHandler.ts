import { Vector3, PerspectiveCamera } from "three";
import { Picker } from "./picker";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Player } from "../../shared";

export class EventsHandler {
  private startPosMouse: Vector3;
  private startPosCamera: Vector3;
  private _mouse: Vector3;
  private _mouseNormalized: Vector3;
  private _isDown = false;
  private _player: Player | null = null;
  constructor(private canvas: HTMLCanvasElement, private picker: Picker,
    private control: OrbitControls, private camera: PerspectiveCamera) {
    this._mouse = new Vector3(-10000, -10000, -10000);
    this._mouseNormalized = this._mouse.clone();
    this.startPosMouse = this._mouse.clone();
    this.startPosCamera = this._mouse.clone();
    this.register();
  }
  private move = (x: number, y: number) => {
    if (!this._isDown) {
      return;
    }
    this._mouse.x = x;
    this._mouse.y = y;
  }
  private mousedown = ({ clientX, clientY }: MouseEvent) => {
    this.down(clientX, clientY);
  }
  private touchdown = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    this.down(clientX, clientY)
  }
  private mousemove = ({ clientX, clientY }: MouseEvent) => {
    this.move(clientX, clientY);
  }
  private touchmove = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    this.move(clientX, clientY)
  }
  private down = (x: number, y: number) => {
    this._isDown = true;
    this._mouse.x = x;
    this._mouse.y = y;
    this.startPosMouse.x = x;
    this.startPosMouse.y = y;
    this.startPosCamera.copy(this.camera.position);
    const res = this.picker.pick(this._mouse);
    if (res) {
      this.control.enabled = false;
    } 

    window.addEventListener('pointermove', this.mousemove);
    window.addEventListener('pointerup', this.up);

    window.addEventListener('touchmove', this.touchmove, { passive: true });
    window.addEventListener('touchend', this.up);
  }
  private up = () => {
    this._isDown = false;
    this._mouse.x = -10000;
    this._mouse.y = -10000;
    this.picker.init();
    this.control.enabled = true;
    this._player?.updatePoint(-1, 0, 0);

    window.removeEventListener('pointermove', this.mousemove);
    window.removeEventListener('pointerup', this.up);

    window.removeEventListener('touchmove', this.touchmove);
    window.removeEventListener('touchend', this.up);
  }
  private moveviewport = ({ clientX, clientY }: MouseEvent) => {
    const { width, height } = this.canvas;
    const ratio = { x: (clientX - width / 2) / width, y: -(clientY - height / 2) / height };
    this.camera.lookAt(ratio.x * 100, ratio.y * 100);
  }
  private register = () => {
    this.canvas.addEventListener('pointerdown', this.mousedown);
    this.canvas.addEventListener('touchstart', this.touchdown, { passive: true });
    // this.canvas.addEventListener('pointermove', this.moveviewport);
  }
  public unregister = () => {
    this.canvas.removeEventListener('pointerdown', this.mousedown);
    this.canvas.removeEventListener('touchstart', this.touchdown);
    // this.canvas.removeEventListener('pointermove', this.moveviewport);
  }
  public get mouse() {
    return this._mouse;
  }
  public get mouseNormalized() {
    this._mouseNormalized.x = this.mouse.x / this.canvas.clientWidth * 2 - 1;
    this._mouseNormalized.y = -(this.mouse.y / this.canvas.clientHeight) * 2 + 1;
    return this._mouseNormalized;
  }
  public set player(player: Player | null) {
    this._player = player;
  }
}