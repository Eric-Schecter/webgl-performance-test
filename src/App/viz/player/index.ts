import { Scene, UniformsUtils, IUniform, WebGLRenderer } from "three";
import { Visualable, GPU } from "../../../shared";
import { PlayerCreator } from "./creator";

type Uniforms = { [uniform: string]: IUniform<any> };
type GPUConstroctor = { new(data: any, renderer: WebGLRenderer, uniform: Uniforms): GPU };
type VizConstroctor = { new(data: any, scene: Scene, pickingScene: Scene, uniform: Uniforms): Visualable }

export class Player {
  private visualizer?: Visualable;
  private gpuHandler?: GPU;
  private uniforms: { [uniform: string]: IUniform<any> };
  private data: any;
  private creator: PlayerCreator;
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
    this.gpuHandler?.updateView(is2d)
  }
  public updateDarkMode = (isDark: boolean) => {
    this.uniforms.isDark.value = isDark ? 1. : 0.;
    this.visualizer?.update();
  }
  public dispose = () => {
    this.visualizer?.dispose();
  }
  public setData = (data: any) => {
    this.data = data;
    return this;
  }
  public setVisualizer = (Viz: VizConstroctor) => {
    this.visualizer = new Viz(this.data, this.scene, this.pickingScene, this.uniforms);
    return this;
  }
  public setGPUHandler = (GPU: GPUConstroctor) => {
    this.gpuHandler = new GPU(this.data, this.renderer, this.uniforms);
    return this;
  }
  public create = (type: string) => {
    this.creator.create(type);
  }
}