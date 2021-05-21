import { GPUComputationRenderer, Variable } from "three/examples/jsm/misc/GPUComputationRenderer";
import { IUniform, WebGLRenderer, Texture, DataTexture, RGBAFormat, FloatType, Vector4 } from "three";
import { fragmentPos, fragmentVelocity } from "./shaders";
import { Data, DataLink, DataNode } from "../data";
import { getTextureSize } from "../../../../shared";

export class GPUHandler {
  private gpuCompute: GPUComputationRenderer;
  private positionVariable: Variable;
  private velocityVariable: Variable;
  private velocityUniforms: { [uniform: string]: IUniform<Texture | number | null> } = {};
  private positionUniforms: { [uniform: string]: IUniform<Texture | number | Vector4 | null> } = {};
  constructor(data: Data, renderer: WebGLRenderer, private uniforms: { [uniform: string]: IUniform<Texture> }) {
    const { links, nodes } = data;
    const nodeWidth = getTextureSize(nodes.length);
    this.gpuCompute = new GPUComputationRenderer(nodeWidth, nodeWidth, renderer);
    this.positionVariable = this.setPosVariable(nodes, nodeWidth);
    this.velocityVariable = this.setVeloVariable(nodeWidth);
    this.setupGpgpu();
    this.setNodesData(nodes, nodeWidth);
    this.setLinksData(links);
  }
  private setPosVariable = (nodes: DataNode[], nodeWidth: number) => {
    const posTexture = new DataTexture(new Float32Array(nodeWidth ** 2 * 4).fill(-1), nodeWidth, nodeWidth, RGBAFormat, FloatType);
    nodes.forEach(({ x, y, z }, i) => posTexture.image.data.set([x, y, z, 0], i * 4));
    return this.gpuCompute.addVariable("texturePosition", fragmentPos, posTexture);
  }
  private setVeloVariable = (nodeWidth: number) => {
    const veloTexture = new DataTexture(new Float32Array(nodeWidth ** 2 * 4).fill(-1), nodeWidth, nodeWidth, RGBAFormat, FloatType);
    return this.gpuCompute.addVariable("textureVelocity", fragmentVelocity, veloTexture);
  }
  private setNodesData = (nodes: DataNode[], nodeWidth: number) => {
    this.velocityUniforms.nodeWidth.value = nodeWidth;
    this.velocityUniforms.nodeCount.value = nodes.length;

    const nodesTexture = new DataTexture(new Float32Array(nodeWidth ** 2 * 4).fill(-1), nodeWidth, nodeWidth, RGBAFormat, FloatType);
    nodes.forEach(({ group }, i) => nodesTexture.image.data.set([group, 0, 0, i], i * 4));
    this.uniforms.textureNodes.value = nodesTexture;
    this.positionUniforms.textureNodes.value = nodesTexture;
    this.velocityUniforms.textureNodes.value = nodesTexture;
  }
  private setLinksData = (links: DataLink[]) => {
    const linkWidth = getTextureSize(links.length);
    this.velocityUniforms.linkWidth.value = linkWidth;

    const count: number[] = [];
    for (let i = 0; i < links.length; i++) {
      this.calculateNodeWeight(links[i], count);
    }

    const linksTexture = new DataTexture(new Float32Array(linkWidth ** 2 * 4).fill(-1), linkWidth, linkWidth, RGBAFormat, FloatType);
    for (let i = 0; i < links.length; i++) {
      const { source, target } = links[i];
      const bias = count[source.index] / (count[source.index] + count[target.index]);
      const strength = 1 / Math.min(count[source.index], count[target.index]); // line strength depends on smaller one
      linksTexture.image.data.set([source.index, target.index, bias, strength], i * 4);
    }

    this.velocityUniforms.textureLinks.value = linksTexture;
  }
  private setDependency = (dependencies: Variable[]) => {
    dependencies.forEach(dependency => this.gpuCompute.setVariableDependencies(dependency, dependencies))
  }
  private setupGpgpu = () => {
    if (!this.positionVariable || !this.velocityVariable) { return }
    this.setDependency([this.positionVariable, this.velocityVariable]);
    this.velocityUniforms = this.velocityVariable.material.uniforms;
    this.positionUniforms = this.positionVariable.material.uniforms;
    this.velocityUniforms.textureParams = { value: null };
    this.positionUniforms.textureNodes = { value: null };
    this.velocityUniforms.textureLinks = { value: null };
    this.velocityUniforms.textureNodes = { value: null };
    this.positionUniforms.pickedNode = { value: new Vector4(-1) };
    this.velocityUniforms.uTime = { value: 0 };
    this.velocityUniforms.linkWidth = { value: 0 };
    this.velocityUniforms.nodeWidth = { value: 0 };
    this.velocityUniforms.nodeCount = { value: 0 };
    const error = this.gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
  }
  public update = (time: number) => {
    if (!this.positionVariable || !this.velocityVariable) { return }
    this.gpuCompute.compute();
    this.uniforms.texturePosition.value = (this.gpuCompute.getCurrentRenderTarget(this.positionVariable) as any).texture;
    this.uniforms.textureVelocity.value = (this.gpuCompute.getCurrentRenderTarget(this.velocityVariable) as any).texture;
    this.velocityUniforms.uTime.value = time;
  }
  private calculateNodeWeight = (link: DataLink, count: number[]) => {
    const { source, target } = link;
    count[source.index] = (count[source.index] || 0) + 1;
    count[target.index] = (count[target.index] || 0) + 1;
  }
  public updatePoint = (i: number, x: number, y: number) => {
    (this.positionUniforms.pickedNode.value as Vector4).set(x, y, 0, i);
  }
}
