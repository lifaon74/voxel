import { u32 } from '@lifaon/math';
import { Texture3DGetColorTrait } from '../../traits/methods/texture-3d.get-color.trait';
import { Texture3DToImageDataTrait } from '../../traits/methods/texture-3d.to-image-data.trait';
import { Texture3DSizeTrait } from '../../traits/properties/texture-3d.size.trait';

export abstract class Texture3DToImageDataImplementationUsingSizeAndGetColor
  implements Texture3DToImageDataTrait
{
  toImageData(this: Texture3DSizeTrait & Texture3DGetColorTrait): ImageData {
    const output: ImageData = new ImageData(this.x, this.y * this.z);
    let i: u32 = 0;
    for (let z: u32 = 0; z < this.z; z++) {
      for (let y: u32 = 0; y < this.y; y++) {
        for (let x: u32 = 0; x < this.x; x++) {
          output.data.set(this.getColor(x, y, z), i);
          i += 4;
        }
      }
    }
    return output;
  }
}
