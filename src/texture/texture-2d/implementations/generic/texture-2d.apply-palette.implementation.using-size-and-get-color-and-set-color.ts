import { f32, i32, math_sqrt, u32, u8 } from '@lifaon/math';
import { TextureColor } from '../../../types/texture-color';
import {
  ColorPalette,
  Texture2DApplyPaletteTrait,
} from '../../traits/methods/texture-2d.apply-palette.trait';
import { Texture2DGetColorTrait } from '../../traits/methods/texture-2d.get-color.trait';
import {
  ColorDepthBits,
  Texture2DReduceColorDepthTrait,
} from '../../traits/methods/texture-2d.reduce-color-depth.trait';
import { Texture2DSetColorTrait } from '../../traits/methods/texture-2d.set-color.trait';
import { Texture2DSizeTrait } from '../../traits/properties/texture-2d.size.trait';

/**
 * @inheritDoc https://www.compuphase.com/cmetric.htm
 */
// function colorDistance(r0: u8, g0: u8, b0: u8, r1: u8, g1: u8, b1: u8): f32 {
//   const r: f32 = r0 - r1;
//   const g: f32 = g0 - g1;
//   const b: f32 = b0 - b1;
//   const rmean: f32 = (r0 + r1) / 2;
//   return math_sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
// }

function colorDistance(r0: u8, g0: u8, b0: u8, r1: u8, g1: u8, b1: u8): f32 {
  const r: f32 = r0 - r1;
  const g: f32 = g0 - g1;
  const b: f32 = b0 - b1;
  return r * r + g * g + b * b;
}

export abstract class Texture2DApplyPaletteImplementationUsingSizeAndGetColorAndSetColor
  implements Texture2DApplyPaletteTrait
{
  applyPalette(
    this: Texture2DSizeTrait & Texture2DGetColorTrait & Texture2DSetColorTrait,
    palette: ColorPalette,
  ): void {
    const paletteLength: u32 = palette.length;
    if (paletteLength === 0) {
      throw new Error('Empty palette.');
    }

    for (let y: u32 = 0; y < this.y; y++) {
      for (let x: u32 = 0; x < this.x; x++) {
        const [r, g, b]: TextureColor = this.getColor(x, y);

        let minDistance: f32 = Number.POSITIVE_INFINITY;
        let minDistanceIndex!: u32;
        for (let i: u32 = 0; i < paletteLength; i += 3) {
          const distance: f32 = colorDistance(r, g, b, palette[i], palette[i + 1], palette[i + 2]);
          if (distance < minDistance) {
            minDistance = distance;
            minDistanceIndex = i;
          }
        }

        this.setColor(
          x,
          y,
          palette[minDistanceIndex],
          palette[minDistanceIndex + 1],
          palette[minDistanceIndex + 2],
          255,
        );
      }
    }
  }
}
