import { u32 } from '@lifaon/math';
import { Texture2DSetColorTrait } from '../../../traits/methods/texture-2d.set-color.trait';
import { Texture2DFactoryCreateTrait } from '../../traits/methods/texture-2d-factory.create.trait';
import { Texture2DFactoryFromImageDataTrait } from '../../traits/methods/texture-2d-factory.from-image-data.trait';

export abstract class Texture2DFactoryFromImageDataImplementationUsingCreate<GNew>
  implements Texture2DFactoryFromImageDataTrait<GNew>
{
  fromImageData(
    this: Texture2DFactoryCreateTrait<GNew & Texture2DSetColorTrait>,
    imageData: ImageData,
  ): GNew {
    const output: GNew & Texture2DSetColorTrait = this.create(imageData.width, imageData.height);
    let i: u32 = 0;
    for (let y: u32 = 0; y < imageData.height; y++) {
      for (let x: u32 = 0; x < imageData.width; x++) {
        output.setColor(
          x,
          y,
          imageData.data[i],
          imageData.data[i + 1],
          imageData.data[i + 2],
          imageData.data[i + 3],
        );
        i += 4;
      }
    }
    return output;
  }
}
