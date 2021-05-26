import { InitData } from "./types";
import { DataNode } from "./datanode";
import { DataLink } from "./datalink";

export { DataNode, DataLink };

export class Data {
  private _nodes: DataNode[];
  private _links: DataLink[];
  constructor(data: InitData) {
    this._nodes = data.nodes.map((node, i) => new DataNode(node, i));
    this._links = data.links.map((link) => new DataLink(this._nodes, link));
  }
  public get nodes() {
    return this._nodes;
  }
  public get links() {
    return this._links;
  }
}