import { RendererTrait } from '../../../../traits/renderer/renderer.trait';
import { Scene } from '../../../scene/scene';

// @ts-ignore
import shader from './shader.wgsl?raw' with {};

export class WebGPURenderer implements RendererTrait {
  readonly canvas: HTMLCanvasElement;
  readonly #ready: Promise<void>;
  readonly #context: GPUCanvasContext;
  #adapter!: GPUAdapter;
  #device!: GPUDevice;
  #pipeline!: GPURenderPipeline;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.#context = this.canvas.getContext('webgpu')!;

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

    this.#adapter = adapter;
    this.#device = await adapter.requestDevice();

    const presentationFormat: GPUTextureFormat = navigator.gpu.getPreferredCanvasFormat();

    this.#context.configure({
      device: this.#device,
      format: presentationFormat,
    });

    const module: GPUShaderModule = this.#device.createShaderModule({
      label: 'our hardcoded red triangle shaders',
      code: shader,
    });

    this.#pipeline = this.#device.createRenderPipeline({
      label: 'our hardcoded red triangle pipeline',
      layout: 'auto',
      vertex: {
        entryPoint: 'vs',
        module,
      },
      fragment: {
        entryPoint: 'fs',
        module,
        targets: [{ format: presentationFormat }],
      },
    });
  }

  clear(): void {}

  render(scene: Scene): void {
    const renderPassDescriptor: GPURenderPassDescriptor = {
      label: 'our basic canvas renderPass',
      colorAttachments: [
        {
          view: this.#context.getCurrentTexture().createView(),
          clearValue: [0.3, 0.3, 0.3, 0.1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    // make a command encoder to start encoding commands
    const encoder = this.#device.createCommandEncoder({ label: 'our encoder' });

    // make a render pass encoder to encode render specific commands
    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(this.#pipeline);
    pass.draw(3); // call our vertex shader 3 times.
    pass.end();

    const commandBuffer = encoder.finish();
    this.#device.queue.submit([commandBuffer]);
  }
}
