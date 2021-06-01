import { Player } from "../..";
import { GPUHandler } from "../../gpuHandler";
import { Nodes, Visualizer } from "../../graph";

class NodesDFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

export const createDFDG = (player: Player,data:any) => {
  Visualizer.nodesType = NodesDFDG;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}