import { Player } from "..";
import { Data } from "../dataHandler/force-directed-tree";
import { GPUHandler } from "../gpuHandler";
import { Nodes, Visualizer } from "../graph";
import { initCount } from "../../../../shared";

class NodesFDT extends Nodes {
  protected getProperty = (n: { depth: number }) => {
    return n.depth;
  }
}

export const createFDT = (player: Player) => {
  const data = new Data(initCount);
  Visualizer.nodesType = NodesFDT;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}