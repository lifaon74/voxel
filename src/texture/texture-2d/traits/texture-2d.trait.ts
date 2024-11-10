import { Texture2DGetColorTrait } from './methods/texture-2d.get-color.trait';
import { Texture2DSetColorTrait } from './methods/texture-2d.set-color.trait';
import { Texture2DSizeTrait } from './properties/texture-2d.size.trait';

export interface ReadonlyTexture2DTrait extends Texture2DSizeTrait, Texture2DGetColorTrait {}

export interface Texture2DTrait extends ReadonlyTexture2DTrait, Texture2DSetColorTrait {}
