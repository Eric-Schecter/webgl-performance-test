export type Node = {
  id: string,
  group: number,
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