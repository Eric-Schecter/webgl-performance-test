import { Scene, BufferGeometry, ShaderMaterial, BufferAttribute, LineSegments, IUniform, Material } from "three";
import { vertexShader, fragmentShader } from './shaders';
// import { DataLink } from "../../types";
import { Pos, getTextureSize } from "../../../../../shared";

export class Edges {
  private mesh: LineSegments;
  constructor(links: any[], nodeReference: Map<number, Pos>, private scene: Scene,
    private uniforms: { [uniform: string]: IUniform<any> }) {
    const length = links.length;
    const size = getTextureSize(length * 2);
    const reference = this.createReference(size, length, links, nodeReference);
    const geo = this.createGeometry(size, reference);
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      depthTest: false,
    })
    this.mesh = new LineSegments(geo, mat)
    this.scene.add(this.mesh);
  }
  private createReference = (size: number, length: number, links: any[], nodeReference: Map<number, Pos>) => {
    const reference = new Float32Array(size ** 2 * 2);
    for (let i = 0, j = 0; i < length; i++) {
      const { source, target } = links[i];
      const sourcePos = nodeReference.get(source.index) as Pos;
      const targetPos = nodeReference.get(target.index) as Pos;
      reference.set([sourcePos.x, sourcePos.y], j * 2);
      reference.set([targetPos.x, targetPos.y], (j + 1) * 2);
      j += 2;
    }
    return reference;
  }
  private createGeometry = (size: number, reference: Float32Array) => {
    const pos = new BufferAttribute(new Float32Array(size ** 2 * 3), 3);
    const geo = new BufferGeometry();
    geo.setAttribute('position', pos);
    geo.setAttribute('reference', new BufferAttribute(reference, 2));
    return geo;
  }
  public update = () => {
    (this.mesh.material as Material).needsUpdate = true;
  }
  public dispose = () => {
    this.mesh.geometry.dispose();
    (this.mesh.material as Material).dispose();
    this.scene.remove(this.mesh);
  }
}