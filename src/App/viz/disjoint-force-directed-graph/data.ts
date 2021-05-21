import { InitData, Node, Link } from "../../../shared/types";

class MyNode {
  protected _id = '';
  protected _group = 0;
  protected _vx = 0;
  protected _vy = 0;
  protected _vz = 0;
  protected _x = 0;
  protected _y = 0;
  protected _z = 0;
  protected _index = -1;
  public get id() {
    return this._id;
  }
  public get group() {
    return this._group;
  }
  public get vx() {
    return this._vx;
  }
  public get vy() {
    return this._vy;
  }
  public get vz() {
    return this._vz;
  }
  public get x() {
    return this._x;
  }
  public get y() {
    return this._y;
  }
  public get z() {
    return this._z;
  }
  public get index() {
    return this._index;
  }
}

export class DataNode extends MyNode {
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

export class DataLink {
  private _source: MyNode;
  private _target: MyNode;
  private _value: number;
  private map: Map<string, DataNode | undefined>;
  constructor(nodes: DataNode[], link: Link) {
    this.map = new Map();
    const { source, target, value } = link;
    this._source = this.getNode(nodes, source);
    this._target = this.getNode(nodes, target);
    this._value = value;
  }
  private getNode = (nodes: DataNode[], id: string) => {
    if (this.map.has(id)) {
      return this.map.get(id) as DataNode;
    }
    const node = nodes.find(d => d.id === id);
    this.map.set(id, node);
    if (!node) {
      return new MyNode();
    }
    return node;
  }
  public get value() {
    return this._value;
  }
  public get source() {
    return this._source;
  }
  public get target() {
    return this._target;
  }
}

export class Data {
  private _nodes: DataNode[];
  private _links: DataLink[];
  constructor(data: InitData) {
    this._nodes = data.nodes.map((node, i) => new DataNode(node, i));
    this._links = data.links.map((link) => new DataLink(this._nodes, link));
  }
  public get nodes() {
    return this._nodes;
  }
  public get links() {
    return this._links;
  }
}