import { Player } from "..";
import { Data, DataNode } from "../data/fdt";
import rawdata from '../data/fdt/data.json';
import { GPUHandler } from "../gpuHandler";
import { Nodes, Edges, Visualizer } from "../graph";
import { Scene, IUniform, Texture } from "three";


class NodesFDT extends Nodes {
  protected createNodesColor = (size: number, nodes: DataNode[]) => {
    const colorArr = new Float32Array(size);
    for (let i = 0; i < nodes.length; i++) {
      const [r, g, b] = this.geneNodeColor(nodes[i].depth);
      colorArr[i * 3] = r;
      colorArr[i * 3 + 1] = g;
      colorArr[i * 3 + 2] = b;
    }
    return colorArr;
  }
}

class VizFDT extends Visualizer {
  constructor(data: any, scene: Scene, pickingScene: Scene, uniforms: { [uniform: string]: IUniform<Texture> }) {
    super();
    const { nodes, links } = data;
    this.nodes = new NodesFDT(nodes, scene, pickingScene, uniforms);
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
}

export const createFDT = (player: Player) => {
  const data = new Data(rawdata);
  player.setData(data)
    .setVisualizer(VizFDT)
    .setGPUHandler(GPUHandler);
}