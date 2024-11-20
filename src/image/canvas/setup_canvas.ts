export function setup_canvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  scale: number = 1,
): HTMLCanvasElement {
  canvas.width = width;
  canvas.height = height;

  canvas.style.width = `${scale * width}px`;
  canvas.style.height = `${scale * height}px`;
  canvas.style.imageRendering = 'pixelated';
  canvas.style.border = '2px solid black';
  canvas.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX////MzMw46qqDAAAAEElEQVQImWNg+M+AFeEQBgB+vw/xfUUZkgAAAABJRU5ErkJggg==')`;
  // ctx.canvas.style.backgroundColor = `black`;

  document.body.appendChild(canvas);

  return canvas;
}
