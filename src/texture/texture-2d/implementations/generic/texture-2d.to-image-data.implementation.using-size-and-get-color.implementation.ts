import { u32 } from '@lifaon/math';
import { Texture2DGetColorTrait } from '../../traits/methods/texture-2d.get-color.trait';
import { Texture2DToImageDataTrait } from '../../traits/methods/texture-2d.to-image-data.trait';
import { Texture2DSizeTrait } from '../../traits/properties/texture-2d.size.trait';

export abstract class Texture2DToImageDataImplementationUsingSizeAndGetColor
  implements Texture2DToImageDataTrait
{
  toImageData(this: Texture2DSizeTrait & Texture2DGetColorTrait): ImageData {
    const output: ImageData = new ImageData(this.x, this.y);
    let i: u32 = 0;
    for (let y: u32 = 0; y < this.y; y++) {
      for (let x: u32 = 0; x < this.x; x++) {
        output.data.set(this.getColor(x, y), i);
        i += 4;
      }
    }
    return output;
  }
}
