import { Scene, BufferGeometry, ShaderMaterial, Points, BufferAttribute, Color, Material, IUniform, Texture } from "three";
import { vertexShader, fragmentShader } from './shaders';
import { DataNode } from "../../data/fdt";
import { Pos, getTextureSize, vec3 } from "../../../../../shared";

export class Nodes {
  private nodes?: Points;
  private pickingNodes?: Points;
  private _nodeReference: Map<number, Pos>;
  private colorMap: Map<number | string, vec3>;
  constructor(private datanodes: DataNode[], private scene: Scene, private pickingScene: Scene,
    private uniforms: { [uniform: string]: IUniform<Texture> }) {
    this._nodeReference = new Map();
    this.colorMap = new Map();
  }
  public init = () => {
    const length = this.datanodes.length;
    const size = getTextureSize(length);
    const nodesBufferLength = size ** 2 * 3;
    const reference = this.setReference(size);
    const pos = new BufferAttribute(new Float32Array(nodesBufferLength), 3);
    this.datanodes.forEach(({ x, y, z }, i) => pos.setXYZ(i, x, y, z));
    this.nodes = this.createNodes(pos, this.createNodesColor(nodesBufferLength, this.datanodes), reference);
    this.scene.add(this.nodes);
    this.pickingNodes = this.createNodes(pos, this.createPickingNodesColor(nodesBufferLength, this.datanodes), reference);
    this.pickingScene.add(this.pickingNodes);
  }
  private setReference = (size: number) => {
    const cnt = size ** 2;
    const references = new BufferAttribute(new Float32Array(cnt * 2), 2);
    for (let i = 0; i < cnt; i++) {
      const x = (i % size) / size;
      const y = ~~(i / size) / size;
      references.setXY(i, x, y);
      this._nodeReference.set(i, { x, y });
    }
    return references;
  }
  private createNodes = (pos: BufferAttribute, colorArr: Float32Array, reference: BufferAttribute) => {
    const color = new BufferAttribute(colorArr, 3);
    const geo = new BufferGeometry();
    geo.setAttribute('position', pos);
    geo.setAttribute('aColor', color);
    geo.setAttribute('reference', reference);

    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
    });
    const points = new Points(geo, mat);
    points.renderOrder = 9999; // set points always on top
    return points;
  }
  protected geneNodeColor = (n: number | string) => {
    if (!this.colorMap.has(n)) {
      this.colorMap.set(n, [Math.random(), Math.random(), Math.random()]);
    }
    return this.colorMap.get(n) || [0, 0, 0];
  }
  private genePickingNodeColor = (i: number) => {
    return new Color().setHex(i + 1);
  }
  protected getProperty = (n: any): any => {
    return Math.random();
  }
  protected createNodesColor = (size: number, nodes: any[]) => {
    const colorArr = new Float32Array(size);
    for (let i = 0; i < nodes.length; i++) {
      const [r, g, b] = this.geneNodeColor(this.getProperty(nodes[i]));
      colorArr[i * 3] = r;
      colorArr[i * 3 + 1] = g;
      colorArr[i * 3 + 2] = b;
    }
    return colorArr;
  }
  private createPickingNodesColor = (size: number, nodes: DataNode[]) => {
    const colorArr = new Float32Array(size);
    for (let i = 0; i < nodes.length; i++) {
      const { r, g, b } = this.genePickingNodeColor(i);
      colorArr[i * 3] = r;
      colorArr[i * 3 + 1] = g;
      colorArr[i * 3 + 2] = b;
    }
    return colorArr;
  }
  private disposeNodes = () => {
    if (!this.nodes) { return }
    this.nodes.geometry.dispose();
    (this.nodes.material as Material).dispose();
    this.scene.remove(this.nodes);
  }
  private disposePickingNodes = () => {
    if (!this.pickingNodes) { return }
    this.pickingNodes.geometry.dispose();
    (this.pickingNodes.material as Material).dispose();
    this.pickingScene.remove(this.pickingNodes);
  }
  public dispose = () => {
    this.disposeNodes();
    this.disposePickingNodes();
  }
  public get nodeReference() {
    return this._nodeReference;
  }
}