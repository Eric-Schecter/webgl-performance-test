import { Player } from "..";
import { Data, DataNode } from "../data/dfdg";
import rawdata from '../data/dfdg/data.json';
import { GPUHandler } from "../gpuHandler";
import { Nodes, Edges, Visualizer } from "../graph";
import { Scene, IUniform, Texture } from "three";

class NodesDFDG extends Nodes {
  protected createNodesColor = (size: number, nodes: DataNode[]) => {
    const colorArr = new Float32Array(size);
    for (let i = 0; i < nodes.length; i++) {
      const [r, g, b] = this.geneNodeColor(nodes[i].group);
      colorArr[i * 3] = r;
      colorArr[i * 3 + 1] = g;
      colorArr[i * 3 + 2] = b;
    }
    return colorArr;
  }
}

class VizDFDG extends Visualizer {
  constructor(data: any, scene: Scene, pickingScene: Scene, uniforms: { [uniform: string]: IUniform<Texture> }) {
    super();
    const { nodes, links } = data;
    this.nodes = new NodesDFDG(nodes, scene, pickingScene, uniforms);
    this.edges = new Edges(links, this.nodes.nodeReference, scene, uniforms);
  }
}

export const createDFDG = (player: Player) => {
  const data = new Data(rawdata);
  player.setData(data)
    .setVisualizer(VizDFDG)
    .setGPUHandler(GPUHandler);
}