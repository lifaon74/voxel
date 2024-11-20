import { RendererTrait } from '../../../traits/renderer/renderer.trait';
import { Scene } from '../../scene/scene';
import { render_scene_using_cpu } from './functions/render_scene_using_cpu/render_scene_using_cpu';

export class CPURenderer implements RendererTrait {
  readonly canvas: HTMLCanvasElement;
  readonly #ctx: CanvasRenderingContext2D;
  readonly #imageData: ImageData;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.#ctx = this.canvas.getContext('2d')!;
    this.#imageData = new ImageData(width, height);
  }

  clear(): void {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
    this.#imageData.data.fill(0);
  }

  render(scene: Scene): void {
    render_scene_using_cpu(scene, this.#imageData);
    this.#ctx.putImageData(this.#imageData, 0, 0);
  }
}
