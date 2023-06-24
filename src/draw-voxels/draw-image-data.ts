import { createCanvasContext } from './create-canvas-context';

export function drawImageData(
  img: ImageData,
): HTMLCanvasElement {
  const ctx: CanvasRenderingContext2D = createCanvasContext(img.width, img.height);
  ctx.putImageData(img, 0, 0);
  return ctx.canvas;
}
