import { Texture3DGetColorTrait } from './methods/texture-3d.get-color.trait';
import { Texture3DSetColorTrait } from './methods/texture-3d.set-color.trait';
import { Texture3DSizeTrait } from './properties/texture-3d.size.trait';

export interface ReadonlyTexture3DTrait extends Texture3DSizeTrait, Texture3DGetColorTrait {}

export interface Texture3DTrait extends ReadonlyTexture3DTrait, Texture3DSetColorTrait {}
