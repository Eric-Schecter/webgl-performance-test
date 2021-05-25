import { Scene, WebGLRenderer, Vector2, Clock } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { resizeRendererToDisplaySize } from './resize';
import { MyCamera } from './camera';
import { Renderer } from './renderer';
import { MyScene } from './scene';
import { EventsHandler } from './eventsHandler';
import { Picker } from './picker';
import { Player } from './player';

export class Viz {
  private scene: Scene;
  private camera: MyCamera;
  private renderer: WebGLRenderer;
  private composer: EffectComposer;
  private player: Player;
  private control: OrbitControls;
  private eventsHandler: EventsHandler;
  private picker: Picker;
  private pickingScene: Scene;
  private clock = new Clock();
  private preTime = 0;
  private is2d = true;
  private isDark = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas).instance;
    this.scene = new MyScene().instance;
    this.pickingScene = new MyScene('black').instance;
    this.camera = new MyCamera(canvas);
    this.composer = this.initComposer();
    this.player = new Player(this.scene, this.pickingScene, this.renderer);
    this.control = this.createControl(canvas);
    this.picker = new Picker(this.renderer, this.camera.instance, this.pickingScene);
    this.eventsHandler = new EventsHandler(canvas, this.picker, this.control, this.camera.instance,this.player);
    this.update();
  }
  private createControl = (canvas: HTMLCanvasElement) => {
    const control = new OrbitControls(this.camera.instance, canvas);
    control.enableDamping = true;
    control.enablePan = false;
    return control;
  }
  private initComposer = () => {
    const renderScene = new RenderPass(this.scene, this.camera.instance);
    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 1;
    const composer = new EffectComposer(this.renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    return composer;
  }
  private needRender = (time: number) => {
    const fpsInterval = 1 / 60;
    const elapsed = time - this.preTime;
    if (elapsed > fpsInterval) {
      this.preTime = time - (elapsed % fpsInterval);
      return true;
    }
    return false;
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
    const time = this.clock.getElapsedTime();
    if (this.needRender(time)) {
      this.draw(time);
    }
    requestAnimationFrame(this.update);
  }
  public changeMode = (is2d: boolean) => {
    this.is2d = is2d;
    this.control.enableRotate = !is2d;
    this.player.updateView(is2d);
    this.camera.init();
  }
  public changeType = (type: string) => {
    this.player.dispose();
    this.player.create(type);
    this.changeMode(this.is2d);
    this.player.updateDarkMode(this.isDark);
  }
  public changeDarkMode = (isDark: boolean) => {
    this.isDark = isDark;
    this.player.updateDarkMode(isDark);
  }
  public unregister = () => {
    this.renderer.dispose();
    this.player.dispose();
  }
}