import { f32 } from '@lifaon/math';

export interface Texture2DScaleTrait<GReturn> {
  scale(x: f32, y: f32): GReturn;
}
