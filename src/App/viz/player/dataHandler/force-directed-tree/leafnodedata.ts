import { Node } from "./node";

export class LeafNodeData extends Node {
  constructor(private _value: number) {
    super();
  }
  public get value() {
    return this._value;
  }
}