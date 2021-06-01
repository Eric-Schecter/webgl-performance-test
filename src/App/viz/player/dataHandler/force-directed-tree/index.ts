import { TreeNodeData } from "./treenodedata";
import { Hierarchy } from "./hierarchy";
import { DataLink } from "./datalink";
import { DataNode, MovealbeTreeNode, MovealbeLeafNode } from './datanode';
import { DataHandler } from "../interface";

export { DataNode, DataLink };

export class Data implements DataHandler {
  private _nodes: DataNode[] = [];
  private _links: DataLink[] = [];
  constructor(n: number, private layer = 7) {
    this.reset(n);
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
  public reset = (n: number) => {
    const data = new TreeNodeData(n, this.layer);
    const hierarchy = new Hierarchy(data);
    this._nodes = this.geneNodes(hierarchy.data);
    this._links = this.geneLinks(hierarchy.data);
  }
  public get data() {
    return { nodes: this._nodes.map(node => node.toJSON), links: this._links.map(link => link.toJSON) };
  }
}