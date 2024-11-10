import { Texture2DFactoryFromImageBitmapSourceTrait } from '../../traits/methods/texture-2d-factory.from-image-bitmap-source.trait';
import { Texture2DFactoryFromUrlTrait } from '../../traits/methods/texture-2d-factory.from-url.trait';

export abstract class Texture2DFactoryFromUrlImplementationUsingFromImageBitmapSource<GNew>
  implements Texture2DFactoryFromUrlTrait<GNew>
{
  async fromUrl(
    this: Texture2DFactoryFromImageBitmapSourceTrait<GNew>,
    url: URL | string,
  ): Promise<GNew> {
    return this.fromImageBitmapSource(await (await fetch(url)).blob(), undefined);
  }
}
