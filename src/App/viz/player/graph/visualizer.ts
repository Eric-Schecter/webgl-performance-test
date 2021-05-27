import { Edges } from "./edges";
import { Nodes } from "./nodes";
import { Scene, IUniform, Texture } from "three";

type Uniforms = { [uniform: string]: IUniform<Texture> };
type NodeConstructor = { new(nodes: any, scene: Scene, pickingScene: Scene, uniforms: Uniforms): Nodes };
export class Visualizer {
  public static nodesType: NodeConstructor;
  protected nodes: Nodes;
  protected edges: Edges;
  constructor(data: any, scene: Scene, pickingScene: Scene, uniforms: Uniforms) {
    const { nodes, links } = data;
    this.nodes = new Visualizer.nodesType(nodes, scene, pickingScene, uniforms);
    this.nodes.init();
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
  public update = () => {
    this.edges.update();
  }
  public dispose = () => {
    this.nodes.dispose();
    this.edges.dispose();
  }
}
