import { TreeNodeData } from "./treenodedata";
import { LeafNodeData } from './leafnodedata';
import { BasicNode } from "./basicnode";
import { MovealbeTreeNode, MovealbeLeafNode } from "./datanode";

export class Hierarchy {
  private _data: MovealbeTreeNode;
  private index = 0;
  constructor(data: TreeNodeData) {
    this._data = new MovealbeTreeNode(data, this.index);
    this.index++;
    this.setDepth();
    this.setHeight();
  }
  private createTreeNode = (child: TreeNodeData, node: MovealbeTreeNode, i: number) => {
    const childNode = new MovealbeTreeNode(child, this.index);
    this.index++;
    node.children[i] = childNode;
    childNode.parent = node;
    childNode.depth = node.depth + 1;
    return childNode;
  }
  private createLeafNode = (child: LeafNodeData, node: MovealbeTreeNode, i: number) => {
    const childNode = new MovealbeLeafNode(child, this.index);
    this.index++;
    node.children[i] = childNode;
    childNode.parent = node;
    childNode.depth = node.depth + 1;
  }
  private setDepth = () => {
    const queue = [this._data];
    while (queue.length) {
      const node = queue.pop() as MovealbeTreeNode;
      if ('children' in node.data) {
        const length = node.data.children.length;
        for (let i = length - 1; i >= 0; i--) {
          const child = node.data.children[i];
          if ('children' in child) {
            queue.push(this.createTreeNode(child, node, i));
          } else {
            this.createLeafNode(child, node, i);
          }
        }
      }
    }
  }
  private updateHeight = (node: BasicNode) => {
    while (node.parent) {
      node.parent.height = Math.max(node.parent.height, node.height + 1);
      node = node.parent;
    }
  }
  private setHeight = () => {
    const queue: Array<MovealbeTreeNode | MovealbeLeafNode> = [this._data];
    while (queue.length) {
      const node = queue.pop() as MovealbeTreeNode | MovealbeLeafNode;
      this.updateHeight(node);
      if (node instanceof MovealbeTreeNode) {
        const { length } = node.children;
        for (let i = length - 1; i >= 0; i--) {
          const child = node.children[i] as MovealbeTreeNode | MovealbeLeafNode
          queue.push(child);
        }
      }
    }
  }
  public get data() {
    return this._data;
  }
}