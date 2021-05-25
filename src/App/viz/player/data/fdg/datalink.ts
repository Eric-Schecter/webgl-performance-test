import { DataNode } from "./datanode";
import { MovableNode } from "./movablenode";
import { Link } from "../../../../../shared";

export class DataLink {
  private _source: MovableNode;
  private _target: MovableNode;
  private _value: number;
  private map: Map<string, DataNode | undefined>;
  constructor(nodes: DataNode[], link: Link) {
    this.map = new Map();
    const { source, target, value } = link;
    this._source = this.getNode(nodes, source);
    this._target = this.getNode(nodes, target);
    this._value = value;
  }
  private getNode = (nodes: DataNode[], id: string) => {
    if (this.map.has(id)) {
      return this.map.get(id) as DataNode;
    }
    const node = nodes.find(d => d.id === id);
    this.map.set(id, node);
    if (!node) {
      return new MovableNode();
    }
    return node;
  }
  public get value() {
    return this._value;
  }
  public get source() {
    return this._source;
  }
  public get target() {
    return this._target;
  }
}