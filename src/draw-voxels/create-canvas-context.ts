export function createCanvasContext(
  width: number,
  height: number,
): CanvasRenderingContext2D {
  const ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  document.body.appendChild(ctx.canvas);

  ctx.canvas.style.width = '512px';
  ctx.canvas.style.height = '512px';
  ctx.canvas.style.imageRendering = 'pixelated';
  ctx.canvas.style.border = '2px solid black';
  // ctx.canvas.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX////MzMw46qqDAAAAEElEQVQImWNg+M+AFeEQBgB+vw/xfUUZkgAAAABJRU5ErkJggg==')`;
  ctx.canvas.style.backgroundColor = `black`;

  return ctx;
}
