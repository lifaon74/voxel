import { u32 } from '@lifaon/math';
import { NEW } from '@lifaon/traits';
import { TextureColor } from '../../../types/texture-color';
import { Texture2DGetColorTrait } from '../../traits/methods/texture-2d.get-color.trait';
import { Texture2DScaleTrait } from '../../traits/methods/texture-2d.scale.trait';
import { Texture2DSetColorTrait } from '../../traits/methods/texture-2d.set-color.trait';
import { Texture2DSizeTrait } from '../../traits/properties/texture-2d.size.trait';
import { Texture2DNewTrait } from '../../traits/well-known/texture-2d.new.trait';

export abstract class Texture2DScaleImplementationUsingNewAndSizeAndGetColorAndSetColor<
  GNew extends Texture2DSetColorTrait,
> implements Texture2DScaleTrait<GNew>
{
  scale(
    this: Texture2DNewTrait<GNew> & Texture2DSizeTrait & Texture2DGetColorTrait,
    x: u32,
    y: u32,
  ): GNew {
    const output: GNew = this[NEW](Math.round(this.x * x), Math.round(this.y * y));

    for (let _y: u32 = 0; _y < sy; _y++) {
      for (let _x: u32 = 0; _x < sx; _x++) {
        const [r, g, b, a]: TextureColor = this.getColor(_x + px, _y + py);
        output.setColor(_x, _y, r, g, b, a);
      }
    }

    return output;
  }
}
