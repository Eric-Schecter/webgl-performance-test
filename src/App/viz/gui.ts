import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { Player } from './player';
import { initCount } from '../../shared';

export class GUIHelper {
  private timer?: ReturnType<typeof setTimeout>;
  constructor(canvas: HTMLCanvasElement, private player: Player) {
    this.createGUI(canvas);
  }
  private createGUI = (canvas: HTMLCanvasElement) => {
    const gui = new GUI({ autoPlace: false });
    canvas.parentElement?.appendChild(gui.domElement);
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '50px';
    gui.domElement.style.right = '10px';
    const params = {
      count: initCount,
    }
    gui.add(params, 'count', 1, 10000, 1).onChange(this.changeCount);
  }
  private changeCount = (n: number) => {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.player.updateData(n);
    }, 333);
  }
}