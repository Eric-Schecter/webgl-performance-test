import { Scene, UniformsUtils, IUniform, WebGLRenderer } from "three";
import { Playable } from "../../../shared/types";
import { Data } from "./data";
import { GPUHandler } from "./gpuHandler";
import rawdata from './data/data.json';
import { Visualizer } from "./visualizer";

export class ForceDirectedTree implements Playable {
  private visualizer: Visualizer;
  private gpuHandler: GPUHandler;
  private uniforms: { [uniform: string]: IUniform<any> };
  constructor(scene: Scene, pickingScene: Scene, private renderer: WebGLRenderer) {
    this.uniforms = UniformsUtils.merge([
      { texturePosition: { value: null } },
      { textureVelocity: { value: null } },
      { textureNodes: { value: null } },
      { isDark: { value: 0 } }
    ]);
    const data = new Data(rawdata);
    this.visualizer = new Visualizer(data, scene, pickingScene, this.uniforms);
    this.gpuHandler = new GPUHandler(data, this.renderer, this.uniforms);
  }
  public update = (time: number) => {
    this.gpuHandler.update(time);
  }
  public updatePoint = (i: number, x: number, y: number) => {
    this.gpuHandler.updatePoint(i, x, y);
  }
  public updateView = (is2d: boolean) => {
    this.gpuHandler.updateView(is2d)
  }
  public updateDarkMode = (isDark: boolean) => {
    this.uniforms.isDark.value = isDark ? 1. : 0.;
    this.visualizer.update();
  }
  public dispose = () => {
    this.visualizer.dispose();
  }
}