import { Texture2DFactoryCreateTrait } from './methods/texture-2d-factory.create.trait';
import { Texture2DFactoryFromImageBitmapSourceTrait } from './methods/texture-2d-factory.from-image-bitmap-source.trait';
import { Texture2DFactoryFromImageBitmapTrait } from './methods/texture-2d-factory.from-image-bitmap.trait';
import { Texture2DFactoryFromImageDataTrait } from './methods/texture-2d-factory.from-image-data.trait';

export interface Texture2DFactoryTrait<GNew>
  extends Texture2DFactoryCreateTrait<GNew>,
    Texture2DFactoryFromImageBitmapSourceTrait<GNew>,
    Texture2DFactoryFromImageBitmapTrait<GNew>,
    Texture2DFactoryFromImageDataTrait<GNew> {}
