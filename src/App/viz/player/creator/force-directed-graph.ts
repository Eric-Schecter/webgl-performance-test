import { Scene, IUniform, Texture } from "three";
import { Player } from "..";
import { Data } from "../data/force-directed-graph";
import { GPUHandler } from "../gpuHandler";
import { Nodes, Edges, Visualizer } from "../graph";
import { dataGenerator } from "../data/force-directed-graph/dataGenerator";

class NodesFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

class VizFDG extends Visualizer {
  constructor(data: any, scene: Scene, pickingScene: Scene, uniforms: { [uniform: string]: IUniform<Texture> }) {
    super();
    const { nodes, links } = data;
    this.nodes = new NodesFDG(nodes, scene, pickingScene, uniforms);
    this.nodes.init();
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
}

export const createFDG = (player: Player) => {
  const data = new Data(dataGenerator(100,10));
  player.setData(data)
    .setVisualizer(VizFDG)
    .setGPUHandler(GPUHandler);
}