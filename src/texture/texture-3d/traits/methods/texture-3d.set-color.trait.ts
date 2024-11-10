import { u32, u8 } from '@lifaon/math';

export interface Texture3DSetColorTrait {
  setColor(
    // position
    x: u32,
    y: u32,
    z: u32,
    // color
    r: u8,
    g: u8,
    b: u8,
    a: u8,
  ): void;
}
