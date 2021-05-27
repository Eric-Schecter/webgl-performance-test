import { Scene, IUniform, Texture } from "three";
import { Player } from "..";
import { Data } from "../dataHandler/force-directed-tree";
import rawdata from '../dataHandler/force-directed-tree/data.json';
import { GPUHandler } from "../gpuHandler";
import { Nodes, Edges, Visualizer } from "../graph";

class NodesFDT extends Nodes {
  protected getProperty = (n: { depth: number }) => {
    return n.depth;
  }
}

class VizFDT extends Visualizer {
  constructor(data: any, scene: Scene, pickingScene: Scene, uniforms: { [uniform: string]: IUniform<Texture> }) {
    super();
    const { nodes, links } = data;
    this.nodes = new NodesFDT(nodes, scene, pickingScene, uniforms);
    this.nodes.init();
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
}

export const createFDT = (player: Player) => {
  const data = new Data(rawdata);
  player.setData(data)
    .setVisualizer(VizFDT)
    .setGPUHandler(GPUHandler);
}