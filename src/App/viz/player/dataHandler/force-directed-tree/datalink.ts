import { MovableNode } from "./moveablenode";
import { MovealbeTreeNode, MovealbeLeafNode } from "./datanode";

export type Link = { source: MovealbeTreeNode, target: MovealbeTreeNode | MovealbeLeafNode };

export class DataLink {
  private _source: MovableNode;
  private _target: MovableNode;
  constructor(link: Link) {
    const { source, target } = link;
    this._source = source;
    this._target = target;
  }
  public get source() {
    return this._source;
  }
  public get target() {
    return this._target;
  }
}