import { Player } from "..";
import { Data } from "../dataHandler/disjoint-force-directed-graph";
import rawdata from '../dataHandler/disjoint-force-directed-graph/data.json';
import { GPUHandler } from "../gpuHandler";
import { Nodes, Visualizer } from "../graph";

class NodesDFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

export const createDFDG = (player: Player) => {
  const data = new Data(rawdata);
  Visualizer.nodesType = NodesDFDG;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}