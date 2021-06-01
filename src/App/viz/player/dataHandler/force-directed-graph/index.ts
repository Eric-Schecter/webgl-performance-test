import { Node } from "./types";
import { DataNode } from "./datanode";
import { DataLink } from "./datalink";
import { randomString, randomBetween } from "../../../../../shared";
import { DataHandler } from "../interface";

export { DataNode, DataLink };

export class Data implements DataHandler{
  private _nodes: DataNode[] = [];
  private _links: DataLink[] = [];
  private gtemp = 1;
  constructor(n: number, private g = 5) {
    this.reset(n);
  }
  private geneLinkData = (node: Node, nodes: Node[], index: number) => {
    const countInGroup = nodes.length / this.g;
    const lowerIndex = ~~(index / countInGroup);
    const higherIndex = lowerIndex + 1;
    let targetIndex = index;
    while (targetIndex === index) {
      targetIndex = randomBetween(0, 10)
        ? randomBetween(countInGroup * lowerIndex, countInGroup * higherIndex - 1)
        : randomBetween(0, nodes.length - 1)
    }
    return { source: node.id, target: nodes[targetIndex].id, value: randomBetween(1, 10) };
  }
  private geneNodesData = (n: number) => {
    const countInGroup = ~~(n / this.g);
    return new Array(n)
      .fill(0)
      .map((d, i) => {
        const id = randomString(10);
        const group = this.gtemp;
        if ((i + 1) % countInGroup === 0) {
          this.gtemp++;
        }
        return { id, group }
      });
  }
  private geneLinksData = (n: number, nodes: Node[]) => {
    return n <= 1
      ? []
      : nodes.map((node, index) =>
        new Array(randomBetween(1, 3))
          .fill(0)
          .map(() => this.geneLinkData(node, nodes, index)))
        .reduce((pre, curr) => pre.concat(curr), [])
  }
  private generate = (n: number) => {
    const nodes = this.geneNodesData(n);
    const links = this.geneLinksData(n, nodes)
    return { nodes, links };
  }
  public reset = (n: number) => {
    this.gtemp = 1;
    const data = this.generate(n);
    this._nodes = data.nodes.map((node, i) => new DataNode(node, i));
    this._links = data.links.map((link) => new DataLink(this._nodes, link));
    return this;
  }
  public get data() {
    return { nodes: this._nodes.map(node=>node.toJSON), links: this._links.map(link=>link.toJSON) };
  }
}