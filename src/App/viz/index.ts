import { Scene, WebGLRenderer, Clock } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { resizeRendererToDisplaySize } from './resize';
import { MyCamera } from './camera';
import { Renderer } from './renderer';
import { MyScene } from './scene';
import { EventsHandler } from './eventsHandler';
import { Picker } from './picker';
import { Player } from './player';
import { MyStats } from './stats';
import { Composer } from './composer';
import { GUIHelper } from './gui';

export class Viz {
  private scene: Scene;
  private camera: MyCamera;
  private renderer: WebGLRenderer;
  private composer: EffectComposer;
  private player: Player;
  private eventsHandler: EventsHandler;
  private picker: Picker;
  private pickingScene: Scene;
  private stats: MyStats;
  private clock = new Clock();
  private is2d = true;
  private isDark = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas).instance;
    this.scene = new MyScene().instance;
    this.pickingScene = new MyScene('black').instance;
    this.camera = new MyCamera(canvas);
    this.composer = new Composer(this.scene, this.camera.instance, this.renderer, canvas).instance;
    this.player = new Player(this.scene, this.pickingScene, this.renderer);
    this.picker = new Picker(this.renderer, this.camera.instance, this.pickingScene);
    this.eventsHandler = new EventsHandler(canvas, this.picker, this.camera, this.player);
    this.stats = new MyStats(canvas);
    new GUIHelper(canvas, this.player);
    this.update();
  }
  private draw = (time: number) => {
    this.player.update(time);
    this.picker.update(this.eventsHandler.mouseNormalized, this.player);
    if (this.isDark) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera.instance);
    }
    resizeRendererToDisplaySize(this.renderer, this.camera.instance, this.composer);
  }
  private update = () => {
    this.stats.update();
    const time = this.clock.getElapsedTime();
    this.draw(time);
    requestAnimationFrame(this.update);
  }
  public changeMode = (is2d: boolean) => {
    this.is2d = is2d;
    this.player.updateView(is2d);
    this.camera.init(is2d);
  }
  public changeType = (type: string) => {
    this.player.create(type);
    this.player.updateView(this.is2d);
    this.player.updateDarkMode(this.isDark);
  }
  public changeDarkMode = (isDark: boolean) => {
    this.isDark = isDark;
    this.player.updateDarkMode(isDark);
  }
  public unregister = () => {
    this.renderer.dispose();
    this.player.dispose();
    this.camera.dispose();
  }
}