import { u32 } from '@lifaon/math';

export class Texture3D {
  readonly data: Uint8ClampedArray;
  readonly x: u32;
  readonly y: u32;
  readonly z: u32;

  constructor(data: Uint8ClampedArray, x: u32, y: u32, z: u32) {
    if (data.length !== x * y * z * 4) {
      throw new Error(`Data size doesn't match x, y, z size`);
    }

    this.data = data;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getIndexFromPosition(x: u32, y: u32, z: u32): number {
    return (x + y * this.x + z * this.x * this.y) * 4;
  }
}
