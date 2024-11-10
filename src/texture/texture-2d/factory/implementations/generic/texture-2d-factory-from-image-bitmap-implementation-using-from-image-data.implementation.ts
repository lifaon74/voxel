import { Texture2DFactoryFromImageBitmapTrait } from '../../traits/methods/texture-2d-factory.from-image-bitmap.trait';
import { Texture2DFactoryFromImageDataTrait } from '../../traits/methods/texture-2d-factory.from-image-data.trait';

export abstract class Texture2DFactoryFromImageBitmapImplementationUsingFromImageData<GNew>
  implements Texture2DFactoryFromImageBitmapTrait<GNew>
{
  fromImageBitmap(this: Texture2DFactoryFromImageDataTrait<GNew>, imageBitmap: ImageBitmap): GNew {
    const ctx: OffscreenCanvasRenderingContext2D = new OffscreenCanvas(
      imageBitmap.width,
      imageBitmap.height,
    ).getContext('2d')!;
    ctx.drawImage(imageBitmap, 0, 0);
    return this.fromImageData(ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height));
  }
}
