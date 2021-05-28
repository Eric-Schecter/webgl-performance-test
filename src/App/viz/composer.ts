import { Scene, Camera, Vector2, WebGLRenderer } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

export class Composer {
  private _instance: EffectComposer;
  constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer, canvas: HTMLCanvasElement) {
    const renderScene = new RenderPass(scene, camera);
    this._instance = new EffectComposer(renderer);
    this._instance.addPass(renderScene);
    this._instance.addPass(this.createBloomPass(canvas));
  }
  private createBloomPass = (canvas: HTMLCanvasElement) => {
    const { clientWidth, clientHeight } = canvas;
    const bloomPass = new UnrealBloomPass(new Vector2(clientWidth, clientHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 0.5;
    bloomPass.radius = 1;
    return bloomPass;
  }
  public get instance() {
    return this._instance;
  }
}