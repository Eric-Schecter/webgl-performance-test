
import { TreeNodeData } from "./treenodedata";
import { LeafNodeData } from './leafnodedata';
import { MovealbeTreeNode } from "./datanode";

export abstract class BasicNode {
  protected _depth = 0;
  protected _height = 0;
  protected _parent: MovealbeTreeNode | null = null;
  constructor(protected _data: TreeNodeData | LeafNodeData) { }
  public get data() {
    return this._data;
  }
  public get depth() {
    return this._depth;
  }
  public set depth(depth: number) {
    this._depth = depth;
  }
  public get height() {
    return this._height;
  }
  public set height(height: number) {
    this._height = height;
  }
  public get parent() {
    return this._parent;
  }
  public set parent(node: MovealbeTreeNode | null) {
    this._parent = node;
  }
}
