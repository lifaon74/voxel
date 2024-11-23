import { RendererTrait } from '../../../traits/renderer/renderer.trait';
import { Scene } from '../../scene/scene';

// @ts-ignore
import shader from './shader.wgsl?raw' with {};

/*
DOC:
- compute to canvas texture: https://gist.github.com/greggman/295e38eeedf5957ac50179308666d98b
- compute shader tutorial: https://surma.dev/things/webgpu/
- WGSL Cheat Sheet: https://github.com/paulgb/wgsl-cheat-sheet
- WGSL specs: https://www.w3.org/TR/WGSL/
 */

export class WebGPURenderer implements RendererTrait {
  readonly canvas: HTMLCanvasElement;
  readonly #ready: Promise<void>;
  readonly #context: GPUCanvasContext;
  #adapter!: GPUAdapter;
  #presentationFormat!: GPUTextureFormat;
  #device!: GPUDevice;
  #pipeline!: GPUComputePipeline;

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
    {
      const adapter: GPUAdapter | null = await navigator.gpu?.requestAdapter();
      if (!adapter) {
        throw new Error('No adapter found.');
      }
      this.#adapter = adapter;
    }

    this.#presentationFormat =
      this.#adapter.features.has('bgra8unorm-storage') ?
        navigator.gpu.getPreferredCanvasFormat()
      : 'rgba8unorm';

    this.#device = await this.#adapter.requestDevice({
      requiredFeatures: this.#presentationFormat === 'bgra8unorm' ? ['bgra8unorm-storage'] : [],
    });

    this.#context.configure({
      device: this.#device,
      format: this.#presentationFormat,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.STORAGE_BINDING,
    });

    const module: GPUShaderModule = this.#device.createShaderModule({
      label: 'voxel rendering shader',
      code: shader,
    });

    const bindGroupLayout: GPUBindGroupLayout = this.#device.createBindGroupLayout({
      entries: [
        {
          binding: 1,
          visibility: GPUShaderStage.COMPUTE,
          buffer: {
            type: 'read-only-storage',
          },
        },
      ],
    });

    this.#pipeline = this.#device.createComputePipeline({
      label: 'voxel rendering pipeline',
      // layout: this.#device.createPipelineLayout({
      //   bindGroupLayouts: [bindGroupLayout],
      // }),
      layout: 'auto',
      compute: {
        module,
        entryPoint: 'cs',
      },
    });
  }

  clear(): void {}

  render(scene: Scene): void {
    const input = new Uint32Array([1, 3, 5]);

    const workBuffer = this.#device.createBuffer({
      label: 'work buffer',
      size: input.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    // Copy our input data to that buffer
    this.#device.queue.writeBuffer(workBuffer, 0, input);

    // Get the current texture from the canvas context
    const canvasTexture = this.#context.getCurrentTexture();

    // ENCODER
    const encoder = this.#device.createCommandEncoder({ label: 'our encoder' });

    const pass = encoder.beginComputePass();
    pass.setPipeline(this.#pipeline);

    const bindGroup0 = this.#device.createBindGroup({
      layout: this.#pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: canvasTexture.createView() }],
    });
    pass.setBindGroup(0, bindGroup0);

    // const bindGroup1 = this.#device.createBindGroup({
    //   layout: this.#pipeline.getBindGroupLayout(1),
    //   entries: [{ binding: 0, resource: { buffer: workBuffer } }],
    // });
    // pass.setBindGroup(1, bindGroup1);

    pass.dispatchWorkgroups(canvasTexture.width, canvasTexture.height);
    pass.end();

    const commandBuffer = encoder.finish();
    this.#device.queue.submit([commandBuffer]);
  }
}
