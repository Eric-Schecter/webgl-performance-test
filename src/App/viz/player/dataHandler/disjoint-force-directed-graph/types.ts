export type Node = {
  id: string,
  group: string,
  radius?: number,
  citing_patents_count?: number,
}

export type Link = {
  source: string,
  target: string,
  value: number,
}

export type InitData = {
  nodes: Node[],
  links: Link[],
}