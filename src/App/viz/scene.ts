import { Scene, Color } from "three";

export class MyScene {
  private _instance: Scene;
  constructor(backgroundColor?:string) {
    this._instance = new Scene();
    if(backgroundColor){
      this._instance.background = new Color(backgroundColor);
    }
  }
  public get instance() {
    return this._instance;
  }
}