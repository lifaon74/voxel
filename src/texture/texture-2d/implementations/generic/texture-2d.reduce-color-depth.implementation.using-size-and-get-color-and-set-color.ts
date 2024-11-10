import { u32, u8 } from '@lifaon/math';
import { TextureColor } from '../../../types/texture-color';
import { Texture2DGetColorTrait } from '../../traits/methods/texture-2d.get-color.trait';
import {
  ColorDepthBits,
  Texture2DReduceColorDepthTrait,
} from '../../traits/methods/texture-2d.reduce-color-depth.trait';
import { Texture2DSetColorTrait } from '../../traits/methods/texture-2d.set-color.trait';
import { Texture2DSizeTrait } from '../../traits/properties/texture-2d.size.trait';

export abstract class Texture2DReduceColorDepthImplementationUsingSizeAndGetColorAndSetColor
  implements Texture2DReduceColorDepthTrait
{
  reduceColorDepth(
    this: Texture2DSizeTrait & Texture2DGetColorTrait & Texture2DSetColorTrait,
    bits: ColorDepthBits,
  ): void {
    if (bits < 8) {
      const mask: u8 = 0b11111111 << (8 - bits);
      for (let y: u32 = 0; y < this.y; y++) {
        for (let x: u32 = 0; x < this.x; x++) {
          const [r, g, b, a]: TextureColor = this.getColor(x, y);
          this.setColor(x, y, r & mask, g & mask, b & mask, a & mask);
        }
      }
    }
  }
}
