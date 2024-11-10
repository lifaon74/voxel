import { u32, u8 } from '@lifaon/math';
import { NEW } from '@lifaon/traits';
import { TextureColor } from '../types/texture-color';
import { Texture3DCropTrait } from './traits/methods/texture-3d.crop.trait';
import { Texture3DGetColorTrait } from './traits/methods/texture-3d.get-color.trait';
import { Texture3DSetColorTrait } from './traits/methods/texture-3d.set-color.trait';
import { Texture3DToImageDataTrait } from './traits/methods/texture-3d.to-image-data.trait';
import { Texture3DSizeTrait } from './traits/properties/texture-3d.size.trait';
import { Texture3DNewTrait } from './traits/well-known/texture-3d.new.trait';

export class Texture3D
  implements
    Texture3DSizeTrait,
    Texture3DGetColorTrait,
    Texture3DSetColorTrait,
    Texture3DNewTrait<Texture3D>,
    Texture3DCropTrait<Texture3D>,
    Texture3DToImageDataTrait
{
  static create(x: u32, y: u32, z: u32): Texture3D {
    return new Texture3D(x, y, z);
  }

  readonly x: u32;
  readonly y: u32;
  readonly z: u32;
  readonly data: Uint8ClampedArray;

  constructor(x: u32, y: u32, z: u32, data?: Uint8ClampedArray) {
    const bytesLength: u32 = x * y * z * 4;
    if (data === undefined) {
      data = new Uint8ClampedArray(bytesLength);
    } else if (data.length !== bytesLength) {
      throw new Error("Data size doesn't match x, y, z size.");
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.data = data;
  }

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
  ): void {
    const index: u32 = this.getIndexFromPosition(x, y, z);
    this.data[index] = r;
    this.data[index + 1] = g;
    this.data[index + 2] = b;
    this.data[index + 3] = a;
  }

  getColor(x: u32, y: u32, z: u32): TextureColor {
    const index: u32 = this.getIndexFromPosition(x, y, z);
    return [this.data[index], this.data[index + 1], this.data[index + 2], this.data[index + 3]];
  }

  getIndexFromPosition(x: u32, y: u32, z: u32): u32 {
    return (x + y * this.x + z * this.x * this.y) * 4;
  }

  [NEW](x: u32, y: u32, z: u32): Texture3D {
    return Texture3D.create(x, y, z);
  }

  crop(
    // position
    px: u32,
    py: u32,
    pz: u32,
    // size
    sx: u32,
    sy: u32,
    sz: u32,
  ): Texture3D {
    throw 'TODO';
  }

  toImageData(): ImageData {
    return new ImageData(this.data, this.x, this.y * this.z);
  }
}
