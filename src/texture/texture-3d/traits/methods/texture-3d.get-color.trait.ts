import { u32 } from '@lifaon/math';
import { TextureColor } from '../../../types/texture-color';

export interface Texture3DGetColorTrait {
  getColor(x: u32, y: u32, z: u32): TextureColor;
}
