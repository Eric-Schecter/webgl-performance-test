import { Scene, UniformsUtils, IUniform, WebGLRenderer } from "three";
import { InitData, Player } from "../../../shared/types";
import { Nodes } from "./nodes";
import { Edges } from "./edges";
import { Data } from "./data";
import { GPUHandler } from "./gpuHandler";
import data from './data.json';

export class DisjointForceDirectedGraph implements Player {
  private nodes: Nodes;
  private edges: Edges;
  private gpuHandler?: GPUHandler;
  private uniforms: { [uniform: string]: IUniform<any> };
  constructor(private scene: Scene, pickingScene: Scene, private renderer: WebGLRenderer) {
    this.uniforms = UniformsUtils.merge([
      { texturePosition: { value: null } },
      { textureVelocity: { value: null } },
      { textureNodes: { value: null } },
    ]);
    this.nodes = new Nodes(scene, pickingScene, this.uniforms);
    this.edges = new Edges(scene, this.uniforms);
    this.setdata(data);
  }
  private setdata(initData: InitData) {
    const data = new Data(initData);
    const { nodes, links } = data;
    this.gpuHandler = new GPUHandler(data, this.renderer, this.uniforms);
    this.nodes.init(nodes);
    this.edges.init(links, this.nodes.nodeReference);
  }
  public update = (time: number) => {
    this.gpuHandler?.update(time);
  }
  public updatePoint = (i: number, x: number, y: number) => {
    this.gpuHandler?.updatePoint(i, x, y);
  }
  public dispose = () => {
    this.nodes.dispose();
    this.edges.dispose();
  }
}