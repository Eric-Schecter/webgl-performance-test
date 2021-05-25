import { Scene, WebGLRenderer } from "three";
import { ForceDirectedGraph } from "./force-directed-graph";
import { Playable } from "../../shared";
import { DisjointForceDirectedGraph } from "./disjoint-force-directed-graph";
import { ForceDirectedTree } from "./force-directed-tree";

type PlayerNewable = { new(scene: Scene, pickingScene: Scene, renderer: WebGLRenderer): Playable }

export const list = {
  'force-directed-graph': ForceDirectedGraph,
  'disjoint-force-directed-graph': DisjointForceDirectedGraph,
  'force-directed-tree': ForceDirectedTree,
}

export class PlayerCreator {
  private map: {[key:string]: PlayerNewable};
  constructor(private scene: Scene, private pickingScene: Scene, private renderer: WebGLRenderer) {
    this.map = list;
  }
  public create = (player: string) => {
    const constructor = this.map[player];
    if (!constructor) {
      return null;
    }
    return new constructor(this.scene, this.pickingScene, this.renderer);
  }
}