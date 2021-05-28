import { Edges } from "./edges";
import { Nodes } from "./nodes";
import { Scene, IUniform, Texture } from "three";

type Uniforms = { [uniform: string]: IUniform<Texture> };
type NodeConstructor = { new(nodes: any, scene: Scene, pickingScene: Scene, uniforms: Uniforms): Nodes };
export class Visualizer {
  public static nodesType: NodeConstructor;
  protected nodes?: Nodes;
  protected edges?: Edges;
  constructor(data: any, private scene: Scene, private pickingScene: Scene, private uniforms: Uniforms) {
    this.reset(data);
  }
  public update = () => {
    this.edges?.update();
  }
  public reset = (data: any) => {
    this.dispose();
    const { nodes, links } = data;
    this.nodes = new Visualizer.nodesType(nodes, this.scene, this.pickingScene, this.uniforms);
    this.nodes.init();
    this.edges = new Edges(links, this.nodes.nodeReference, this.scene, this.uniforms);
  }
  public dispose = () => {
    this.nodes?.dispose();
    this.edges?.dispose();
  }
}
