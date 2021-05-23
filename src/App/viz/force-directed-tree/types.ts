type Node = {
  name:string,
}

export interface LeafNodeData extends Node {
  value: number,
}

export interface TreeNodeData extends Node {
  children: Array<TreeNodeData | LeafNodeData>,
}