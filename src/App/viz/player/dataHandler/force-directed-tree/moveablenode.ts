import { BasicNode } from "./basicnode";

export class MovableNode extends BasicNode {
  protected _vx = 0;
  protected _vy = 0;
  protected _vz = 0;
  protected _x = 0;
  protected _y = 0;
  protected _z = 0;
  protected _index = -1;
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
  public get toJSON() {
    return {
      vx: this._vx,
      vy: this._vy,
      vz: this._vz,
      x: this._x,
      y: this._y,
      z: this._z,
      index: this._index,
      depth: this._depth,
      height: this._height,
    }
  }
}