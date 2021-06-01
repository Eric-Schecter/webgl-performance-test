import { Player } from "../..";
import { GPUHandler } from "../../gpuHandler";
import { Nodes, Visualizer } from "../../graph";

class NodesFDG extends Nodes {
  protected getProperty = (n: { group: number }) => {
    return n.group;
  }
}

export const createFDG = (player: Player,data:any) => {
  Visualizer.nodesType = NodesFDG;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}