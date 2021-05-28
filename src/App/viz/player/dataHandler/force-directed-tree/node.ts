import { randomString } from "../../../../../shared";

export class Node {
  private _name = randomString(10);
  public get name() {
    return this._name;
  }
}