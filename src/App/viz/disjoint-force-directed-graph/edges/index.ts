import { Scene, BufferGeometry, ShaderMaterial, BufferAttribute, LineSegments, IUniform, Material } from "three";
import { vertexShader, fragmentShader } from './shaders';
import { DataLink } from "../data";
import { Pos, getTextureSize } from "../../../../shared";

export class Edges {
  private mesh?: LineSegments;
  constructor(private scene: Scene, private uniforms: { [uniform: string]: IUniform<any> }) { }
  public init = (links: DataLink[], nodeReference: Map<number, Pos>) => {
    const length = links.length;
    const size = getTextureSize(length * 2);
    const pos = new BufferAttribute(new Float32Array(size ** 2 * 3), 3);
    const reference = new Float32Array(size ** 2 * 2);
    for (let i = 0, j = 0; i < length; i++) {
      const { source, target } = links[i];
      const sourcePos = nodeReference.get(source.index) as Pos;
      const targetPos = nodeReference.get(target.index) as Pos;
      reference.set([sourcePos.x, sourcePos.y], j * 2);
      reference.set([targetPos.x, targetPos.y], (j + 1) * 2);
      j += 2;
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', pos);
    geo.setAttribute('reference', new BufferAttribute(reference, 2));
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
    })
    this.mesh = new LineSegments(geo, mat)
    this.scene.add(this.mesh);
  }
  public dispose = () => {
    if (!this.mesh) { return; }
    this.mesh.geometry.dispose();
    (this.mesh.material as Material).dispose();
    this.scene.remove(this.mesh);
  }
}