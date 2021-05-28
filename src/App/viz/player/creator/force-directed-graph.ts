import { Player } from "..";
import { Data } from "../dataHandler/force-directed-graph";
import { GPUHandler } from "../gpuHandler";
import { Nodes, Visualizer } from "../graph";
import { initCount } from "../../../../shared";

class NodesFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

export const createFDG = (player: Player) => {
  const data = new Data(initCount);
  Visualizer.nodesType = NodesFDG;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}