import { Player } from "..";
import { Data } from "../dataHandler/force-directed-tree";
import rawdata from '../dataHandler/force-directed-tree/data.json';
import { GPUHandler } from "../gpuHandler";
import { Nodes, Visualizer } from "../graph";

class NodesFDT extends Nodes {
  protected getProperty = (n: { depth: number }) => {
    return n.depth;
  }
}

export const createFDT = (player: Player) => {
  const data = new Data(rawdata);
  Visualizer.nodesType = NodesFDT;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}