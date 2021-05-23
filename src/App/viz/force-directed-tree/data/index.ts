import { TreeNodeData } from "./../types";
import { Hierarchy } from "./hierarchy";
import { DataLink } from "./datalink";
import { DataNode, MovealbeTreeNode, MovealbeLeafNode } from './datanode';

export { DataNode, DataLink };

export class Data {
  private _nodes: DataNode[];
  private _links: DataLink[];
  constructor(data: TreeNodeData) {
    const hierarchy = new Hierarchy(data);
    this._nodes = this.geneNodes(hierarchy.data);
    this._links = this.geneLinks(hierarchy.data);
  }
  private geneLinks = (root: MovealbeTreeNode | MovealbeLeafNode) => {
    const links: DataLink[] = [];
    const queue: Array<MovealbeTreeNode | MovealbeLeafNode> = [root];
    while (queue.length) {
      const node = queue.pop() as MovealbeTreeNode | MovealbeLeafNode;
      if ('children' in node) {
        node.children.forEach(child => {
          if (child instanceof MovealbeTreeNode || child instanceof MovealbeLeafNode) {
            links.push(new DataLink({ source: node, target: child }));
            queue.push(child);
          }
        });
      }
    }
    return links;
  }
  private geneNodes = (root: MovealbeTreeNode | MovealbeLeafNode) => {
    const nodes = [root];
    const queue: Array<MovealbeTreeNode | MovealbeLeafNode> = [root];
    while (queue.length) {
      const node = queue.pop() as MovealbeTreeNode | MovealbeLeafNode;
      if ('children' in node) {
        node.children.forEach(child => {
          if (child instanceof MovealbeTreeNode || child instanceof MovealbeLeafNode) {
            nodes.push(child);
            queue.push(child);
          }
        });
      }
    }
    return nodes;
  }
  public get nodes() {
    return this._nodes;
  }
  public get links() {
    return this._links;
  }
}