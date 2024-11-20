import { RendererTrait } from '../../../traits/renderer/renderer.trait';
import { Scene } from '../../scene/scene';

export class WebGPURenderer implements RendererTrait {
  readonly canvas: HTMLCanvasElement;
  readonly #ready: Promise<void>;
  readonly #ctx: GPUCanvasContext;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.#ctx = this.canvas.getContext('webgpu')!;

    this.#ready = this.#init();
  }

  get ready(): Promise<void> {
    return this.#ready;
  }

  async #init(): Promise<void> {
    const adapter: GPUAdapter | null = await navigator.gpu?.requestAdapter();

    if (!adapter) {
      throw new Error('No adapter found.');
    }

    const device: GPUDevice = await adapter.requestDevice();
    console.log(device);
    this.#ctx.configure({
      device,
      format: navigator.gpu.getPreferredCanvasFormat(),
    });
  }

  clear(): void {}

  render(scene: Scene): void {
    throw 'TODO';
    // render_scene_using_cpu(scene, this.imageData);
  }
}
