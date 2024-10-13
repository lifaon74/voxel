export function create_canvas_context(
  width: number,
  height: number,
  scale: number = 1,
): CanvasRenderingContext2D {
  const ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  document.body.appendChild(ctx.canvas);

  ctx.canvas.style.width = `${scale * width}px`;
  ctx.canvas.style.height = `${scale * height}px`;
  ctx.canvas.style.imageRendering = 'pixelated';
  ctx.canvas.style.border = '2px solid black';
  ctx.canvas.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX////MzMw46qqDAAAAEElEQVQImWNg+M+AFeEQBgB+vw/xfUUZkgAAAABJRU5ErkJggg==')`;
  // ctx.canvas.style.backgroundColor = `black`;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  return ctx;
}
