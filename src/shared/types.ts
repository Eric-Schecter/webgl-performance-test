export type Pos = {
  x: number,
  y: number,
}

export type vec3 = [number, number, number];

export interface Visualable {
  update: () => void;
  dispose: () => void;
}

export interface GPU {
  update: (time: number) => void;
  updatePoint: (i: number, x: number, y: number) => void;
  updateView: (is2d: boolean) => void;
}