import { Scene, IUniform, Texture } from "three";
import { Player } from "..";
import { Data } from "../data/disjoint-force-directed-graph";
import rawdata from '../data/disjoint-force-directed-graph/data.json';
import { GPUHandler } from "../gpuHandler";
import { Nodes, Edges, Visualizer } from "../graph";

class NodesDFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

class VizDFDG extends Visualizer {
  constructor(data: any, scene: Scene, pickingScene: Scene, uniforms: { [uniform: string]: IUniform<Texture> }) {
    super();
    const { nodes, links } = data;
    this.nodes = new NodesDFDG(nodes, scene, pickingScene, uniforms);
    this.nodes.init();
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
}

export const createDFDG = (player: Player) => {
  const data = new Data(rawdata);
  player.setData(data)
    .setVisualizer(VizDFDG)
    .setGPUHandler(GPUHandler);
}