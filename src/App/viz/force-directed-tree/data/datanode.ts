import { MovableNode } from "./moveablenode";
import { TreeNodeData, LeafNodeData } from "../types";

export class DataNode extends MovableNode {
  private initRaidus = 10;
  private initAngle = Math.PI * (3 - Math.sqrt(5));
  constructor(node: TreeNodeData | LeafNodeData, index: number) {
    super(node);
    this._index = index;
    const angle = this.initAngle * index;
    const radius = this.initRaidus * Math.sqrt(0.5 + index);
    this._x = radius * Math.cos(angle);
    this._y = radius * Math.sin(angle);
    this._z = 0;
  }
}

export class MovealbeTreeNode extends DataNode{
  private _children: Array<MovealbeTreeNode | MovealbeLeafNode | TreeNodeData | LeafNodeData>;
  constructor(node:TreeNodeData,index:number){
    super(node,index);
    this._children = node.children;
  }
  public get children(): Array<MovealbeTreeNode | MovealbeLeafNode | TreeNodeData | LeafNodeData> {
    return this._children;
  }
}

export class MovealbeLeafNode extends DataNode{
  private _value: number;
  constructor(node: LeafNodeData, index: number){
    super(node,index);
    this._value = node.value;
  }
  public get value(): number {
    return this._value;
  }
}