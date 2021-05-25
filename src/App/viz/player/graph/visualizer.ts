import { Edges } from "./edges";
import { Nodes } from "./nodes";

export abstract class Visualizer {
  protected nodes?: Nodes;
  protected edges?: Edges;
  public update = () =>{
    this.edges?.update();
  }
  public dispose = () => {
    this.nodes?.dispose();
    this.edges?.dispose();
  }
}
