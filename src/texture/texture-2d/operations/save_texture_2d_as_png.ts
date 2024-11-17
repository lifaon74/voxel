import { saveFile, SaveFileOptions } from '../../../misc/save-file';
import { Texture2DToImageDataTrait } from '../traits/methods/texture-2d.to-image-data.trait';
import { ReadonlyTexture2DTrait } from '../traits/texture-2d.trait';

export async function save_texture_2d_as_png(
  texture2d: ReadonlyTexture2DTrait & Texture2DToImageDataTrait,
  options?: SaveFileOptions,
): Promise<void> {
  const canvas: OffscreenCanvas = new OffscreenCanvas(texture2d.x, texture2d.y);
  const ctx: OffscreenCanvasRenderingContext2D = canvas.getContext('2d')!;
  ctx.putImageData(texture2d.toImageData(), 0, 0);

  await saveFile(
    await canvas.convertToBlob({
      type: 'image/png',
    }),
    options,
  );
}
