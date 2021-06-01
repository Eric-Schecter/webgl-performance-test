import { Scene, UniformsUtils, IUniform, WebGLRenderer } from "three";
import { Visualable, GPU } from "../../../shared";
import { PlayerCreator } from "./creator";
import { initCount } from "../../../shared";

type Uniforms = { [uniform: string]: IUniform<any> };
type GPUConstroctor = { new(data: any, renderer: WebGLRenderer, uniform: Uniforms, is2d: boolean): GPU };
type VizConstroctor = { new(data: any, scene: Scene, pickingScene: Scene, uniform: Uniforms): Visualable }

export class Player {
  private visualizer?: Visualable;
  private gpuHandler?: GPU;
  private uniforms: Uniforms;
  private data: any;
  private creator: PlayerCreator;
  private n = initCount;
  private type = '';
  private is2d = true;
  constructor(private scene: Scene, private pickingScene: Scene, private renderer: WebGLRenderer) {
    this.uniforms = UniformsUtils.merge([
      { texturePosition: { value: null } },
      { textureVelocity: { value: null } },
      { textureNodes: { value: null } },
      { isDark: { value: 0 } }
    ]);
    this.creator = new PlayerCreator(this);
  }
  public update = (time: number) => {
    this.gpuHandler?.update(time);
  }
  public updatePoint = (i: number, x: number, y: number) => {
    this.gpuHandler?.updatePoint(i, x, y);
  }
  public updateView = (is2d: boolean) => {
    this.is2d = is2d;
    this.gpuHandler?.updateView(is2d)
  }
  public updateDarkMode = (isDark: boolean) => {
    this.uniforms.isDark.value = isDark ? 1. : 0.;
    this.visualizer?.update();
  }
  public updateData = (n: number) => {
    this.n = n;
    this.creator.update(this.type, this.n);
  }
  public reset = () => {
    this.gpuHandler?.reset(this.data, this.is2d);
    this.visualizer?.reset(this.data);
  }
  public dispose = () => {
    this.visualizer?.dispose();
  }
  public setData = (data: any) => {
    this.data = data;
    return this;
  }
  public setVisualizer = (Viz: VizConstroctor) => {
    this.visualizer?.dispose();
    this.visualizer = new Viz(this.data, this.scene, this.pickingScene, this.uniforms);
    return this;
  }
  public setGPUHandler = (GPU: GPUConstroctor) => {
    this.gpuHandler = new GPU(this.data, this.renderer, this.uniforms, this.is2d);
    return this;
  }
  public create = (type: string) => {
    this.type = type;
    this.creator.create(type, this.n);
  }
}