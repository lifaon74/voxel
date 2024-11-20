import { create_canvas } from './create_canvas';

export function create_canvas_context(
  width: number,
  height: number,
  scale?: number,
): CanvasRenderingContext2D {
  const ctx: CanvasRenderingContext2D = create_canvas(width, height, scale).getContext('2d')!;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  return ctx;
}
