import { Nodes } from "./nodes"
import { Edges } from "./edges";
import { Data } from "../data";
import { Scene, IUniform, Texture } from "three";

export class Visualizer {
  private nodes: Nodes;
  private edges: Edges;
  constructor(data: Data, scene: Scene, pickingScene: Scene, uniforms: { [uniform: string]: IUniform<Texture> }) {
    const { nodes, links } = data;
    this.nodes = new Nodes(nodes, scene, pickingScene, uniforms);
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
  public update = () =>{
    this.edges.update();
  }
  public dispose = () => {
    this.nodes.dispose();
    this.edges.dispose();
  }
}