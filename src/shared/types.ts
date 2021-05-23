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

export type Pos = {
  x: number,
  y: number,
}

export type vec3 = [number, number, number];

export interface Player {
  update: (time: number) => void;
  updatePoint: (i: number, x: number, y: number) => void;
  updateView: (is2d: boolean) => void;
  dispose: () => void;
}