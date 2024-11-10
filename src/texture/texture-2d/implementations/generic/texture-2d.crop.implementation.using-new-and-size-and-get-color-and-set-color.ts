import { u32 } from '@lifaon/math';
import { NEW } from '@lifaon/traits';
import { TextureColor } from '../../../types/texture-color';
import { Texture2DCropTrait } from '../../traits/methods/texture-2d.crop.trait';
import { Texture2DGetColorTrait } from '../../traits/methods/texture-2d.get-color.trait';
import { Texture2DSetColorTrait } from '../../traits/methods/texture-2d.set-color.trait';
import { Texture2DSizeTrait } from '../../traits/properties/texture-2d.size.trait';
import { Texture2DNewTrait } from '../../traits/well-known/texture-2d.new.trait';
import { checkTexture2DCropInputs } from './check-texture-2d-crop-inputs';

export abstract class Texture2DCropImplementationUsingNewAndSizeAndGetColorAndSetColor<
  GNew extends Texture2DSetColorTrait,
> implements Texture2DCropTrait<GNew>
{
  crop(
    this: Texture2DNewTrait<GNew> & Texture2DSizeTrait & Texture2DGetColorTrait,
    // position
    px: u32,
    py: u32,
    // size
    sx: u32,
    sy: u32,
  ): GNew {
    checkTexture2DCropInputs.call(this, px, py, sx, sy);

    const output: GNew = this[NEW](sx, sy);

    for (let _y: u32 = 0; _y < sy; _y++) {
      for (let _x: u32 = 0; _x < sx; _x++) {
        const [r, g, b, a]: TextureColor = this.getColor(_x + px, _y + py);
        output.setColor(_x, _y, r, g, b, a);
      }
    }

    return output;
  }
}
