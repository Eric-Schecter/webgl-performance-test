import { MovableNode } from "./movablenode";
import { Node } from "../../../../shared";

export class DataNode extends MovableNode {
  private initRaidus = 10;
  private initAngle = Math.PI * (3 - Math.sqrt(5));
  constructor(node: Node, index: number) {
    super();
    this._index = index;
    const { id, group } = node;
    this._id = id;
    this._group = group;
    const angle = this.initAngle * index;
    const radius = this.initRaidus * Math.sqrt(0.5 + index);
    this._x = radius * Math.cos(angle);
    this._y = radius * Math.sin(angle);
    this._z = 0;
  }
}