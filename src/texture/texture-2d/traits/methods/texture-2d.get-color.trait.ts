import { u32 } from '@lifaon/math';
import { TextureColor } from '../../../types/texture-color';

export interface Texture2DGetColorTrait {
  getColor(x: u32, y: u32): TextureColor;
}
