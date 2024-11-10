import { u32 } from '@lifaon/math';
import { Texture2DSizeTrait } from '../../traits/properties/texture-2d.size.trait';

export function checkTexture2DCropInputs(
  this: Texture2DSizeTrait,
  // position
  px: u32,
  py: u32,
  // size
  sx: u32,
  sy: u32,
): void {
  if (px < 0 || px > this.x) {
    throw new RangeError(`Expect px in range [0, ${this.x}].`);
  }
  if (py < 0 || py > this.y) {
    throw new RangeError(`Expect py in range [0, ${this.y}].`);
  }
  if (sx < 0 || sx > this.x - px) {
    throw new RangeError(`Expect x in range [0, ${this.x - px}].`);
  }
  if (sy < 0 || sy > this.y - py) {
    throw new RangeError(`Expect x in range [0, ${this.y - py}].`);
  }
}
