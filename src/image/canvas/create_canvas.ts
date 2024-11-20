export function create_canvas(width: number, height: number, scale: number = 1): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  canvas.style.width = `${scale * width}px`;
  canvas.style.height = `${scale * height}px`;
  canvas.style.imageRendering = 'pixelated';
  canvas.style.border = '2px solid black';
  canvas.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX////MzMw46qqDAAAAEElEQVQImWNg+M+AFeEQBgB+vw/xfUUZkgAAAABJRU5ErkJggg==')`;
  // ctx.canvas.style.backgroundColor = `black`;

  return canvas;
}
