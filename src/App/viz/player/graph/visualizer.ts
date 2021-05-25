import { Edges } from "./edges";

export abstract class Visualizer {
  protected nodes?: any;
  protected edges?: Edges;
  public update = () =>{
    this.edges?.update();
  }
  public dispose = () => {
    this.nodes?.dispose();
    this.edges?.dispose();
  }
}
