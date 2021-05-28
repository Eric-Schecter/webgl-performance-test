import { Player } from "..";
import { Data } from "../dataHandler/disjoint-force-directed-graph";
import { GPUHandler } from "../gpuHandler";
import { Nodes, Visualizer } from "../graph";
import { initCount } from "../../../../shared";

class NodesDFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

export const createDFDG = (player: Player) => {
  const data = new Data(initCount);
  Visualizer.nodesType = NodesDFDG;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}