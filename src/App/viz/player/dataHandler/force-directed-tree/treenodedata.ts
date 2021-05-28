import { randomBetween } from "../../../../../shared";
import { LeafNodeData } from "./leafnodedata";
import { Node } from "./node";

export class TreeNodeData extends Node {
  private _children: Array<TreeNodeData | LeafNodeData>;
  constructor(total: number, layer: number) {
    super();
    this._children = layer > 1 && total > 1
      ? this.generateTreeNodeData(total - 1, layer)
      : this.generateLeafNodeData(total - 1);
  }
  private generateTreeNodeData = (total: number, layer: number): Array<TreeNodeData | LeafNodeData> => {
    const siblingCount = randomBetween(1, Math.min(10, total));
    const childrenCount = ~~(total / siblingCount);
    return new Array(siblingCount)
      .fill(0)
      .map((d, i) => {
        const n = i === siblingCount - 1 ? total - (siblingCount - 1) * childrenCount : childrenCount;
        return new TreeNodeData(n, layer - 1);
      })
  }
  private generateLeafNodeData = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => new LeafNodeData(randomBetween(1, 10)));
  }
  public get children() {
    return this._children;
  }
}