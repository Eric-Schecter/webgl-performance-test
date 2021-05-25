import { Scene, WebGLRenderTarget, WebGLRenderer, PerspectiveCamera, Vector3 } from "three";
import { Playable } from "../../shared";

export class Picker {
  private renderTarget: WebGLRenderTarget;
  private buffer: Uint8Array;
  private id = -1;
  constructor(private renderer: WebGLRenderer, private camera: PerspectiveCamera,
    private pickingScene: Scene) {
    this.renderTarget = new WebGLRenderTarget(1, 1);
    this.buffer = new Uint8Array(4);
  }
  private screen2world = (mouse: Vector3) => {
    const { x, y } = mouse;
    const vec = new Vector3(x, y, 0.5);
    vec.unproject(this.camera);
    vec.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / vec.z;
    const pos = new Vector3();
    pos.copy(this.camera.position).add(vec.multiplyScalar(distance));
    return pos;
  }
  public pick = (mouse: Vector3) => {
    const { width, height } = this.renderer.domElement;
    const x = mouse.x * window.devicePixelRatio;
    const y = mouse.y * window.devicePixelRatio;
    this.camera.setViewOffset(width, height, x, y, 1, 1);

    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.pickingScene, this.camera);
    this.renderer.setRenderTarget(null);
    this.renderer.readRenderTargetPixels(this.renderTarget, 0, 0, 1, 1, this.buffer);

    this.camera.clearViewOffset();

    this.id = (this.buffer[0] << 16) | (this.buffer[1] << 8) | (this.buffer[2] - 1);
    return this.id !== -1;
  }
  public init = () => {
    this.id = -1;
  }
  public update = (mouse: Vector3, player: Playable) => {
    if (this.id === -1) { return }
    const pos = this.screen2world(mouse);
    player.updatePoint(this.id, pos.x, pos.y);
  }
}