import { create_canvas_context } from './create_canvas_context';

export function draw_image_data(img: ImageData, scale?: number): HTMLCanvasElement {
  const ctx: CanvasRenderingContext2D = create_canvas_context(img.width, img.height, scale);
  ctx.putImageData(img, 0, 0);
  return ctx.canvas;
}
