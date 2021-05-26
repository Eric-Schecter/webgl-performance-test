import Stats from 'stats.js';

export class MyStats {
  private stats:Stats;
  constructor(canvas:HTMLCanvasElement){
    this.stats = new Stats();
    this.stats.showPanel(0);
    canvas.parentElement?.appendChild(this.stats.dom);
  }
  public update = () =>{
    this.stats.update();
  }
}