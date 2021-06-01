import { DataNode } from "./datanode";
import { DataLink } from "./datalink";
import { randomBetween, randomString } from "../../../../../shared";
import { DataHandler } from "../interface";

export { DataNode, DataLink };

export class Data implements DataHandler {
  private _nodes: DataNode[] = [];
  private _links: DataLink[] = [];
  private generateNodes = (n: number) => {
    return new Array(n).fill(0).map((d, i) => {
      return { id: randomString(10), group: i === 0 ? 2 : 1 }
    })
  }
  private generateLinks = (nodes: Array<{ id: string, group: number }>) => {
    const [{ id }] = nodes;
    const others = nodes.slice(1);
    return others.map(other => {
      return { source: id, target: other.id, value: randomBetween(1, 3) }
    });
  }
  private splitArray = (n: number) => {
    const arr = [];
    while (n) {
      const length = n < 10 ? n : randomBetween(2, 10);
      arr.push(length);
      n -= length;
    }
    return arr;
  }
  private generate = (n: number) => {
    const arr = this.splitArray(n);
    const nodesGroup = arr.map(count => this.generateNodes(count));
    const nodes = nodesGroup.flat();
    const links = nodesGroup.map(node => this.generateLinks(node)).flat();
    return { nodes, links };
  }
  public init = (n: number) => {
    const data = this.generate(n);
    this._nodes = data.nodes.map((node, i) => new DataNode(node, i));
    this._links = data.links.map((link) => new DataLink(this._nodes, link));
    return this;
  }
  public get data() {
    return { nodes: this._nodes.map(node => node.toJSON), links: this._links.map(link => link.toJSON) };
  }
}