import { Texture2DFactoryFromImageBitmapSourceTrait } from '../../traits/methods/texture-2d-factory.from-image-bitmap-source.trait';
import { Texture2DFactoryFromImageBitmapTrait } from '../../traits/methods/texture-2d-factory.from-image-bitmap.trait';

export abstract class Texture2DFactoryFromImageBitmapSourceImplementationUsingFromImageBitmap<GNew>
  implements Texture2DFactoryFromImageBitmapSourceTrait<GNew>
{
  async fromImageBitmapSource(
    this: Texture2DFactoryFromImageBitmapTrait<GNew>,
    source: ImageBitmapSource,
    options?: ImageBitmapOptions | undefined,
  ): Promise<GNew> {
    return this.fromImageBitmap(await createImageBitmap(source, options));
  }
}
