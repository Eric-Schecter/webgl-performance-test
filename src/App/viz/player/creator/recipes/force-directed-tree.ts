import { Player } from "../..";
import { GPUHandler } from "../../gpuHandler";
import { Nodes, Visualizer } from "../../graph";

class NodesFDT extends Nodes {
  protected getProperty = (n: { depth: number }) => {
    return n.depth;
  }
}

export const createFDT = (player: Player,data:any) => {
  Visualizer.nodesType = NodesFDT;
  player.setData(data)
    .setVisualizer(Visualizer)
    .setGPUHandler(GPUHandler);
}