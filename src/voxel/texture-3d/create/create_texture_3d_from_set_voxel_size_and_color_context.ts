import { u32, u8 } from '@lifaon/math';
import { ISetVoxelColorFunction } from '../../generate/set-voxel-color-function.type';
import { ISetVoxelSizeFunction } from '../../generate/set-voxel-size-function.type';
import { Texture3D } from '../texture-3d.class';

export interface ISetVoxelSizeAndColorContext {
  (
    setVoxelSizeFunction: ISetVoxelSizeFunction,
    setVoxelColorFunction: ISetVoxelColorFunction,
  ): void;
}

export function create_texture_3d_from_set_voxel_size_and_color_context(
  context: ISetVoxelSizeAndColorContext,
): Texture3D {
  let data!: Uint8ClampedArray;
  let s_x!: u32;
  let s_y!: u32;
  let s_z!: u32;
  let s_xy!: u32;

  const setVoxelSizeFunction: ISetVoxelSizeFunction = (x: u32, y: u32, z: u32): void => {
    s_x = x;
    s_y = y;
    s_z = z;
    s_xy = x * y;
    data = new Uint8ClampedArray(x * y * z * 4);
  };

  const setVoxelColorFunction: ISetVoxelColorFunction = (
    // position
    x: u32,
    y: u32,
    z: u32,
    // color
    r: u8,
    g: u8,
    b: u8,
    a: u8,
  ): void => {
    const index: u32 = (x + y * s_x + z * s_xy) * 4;
    data[index] = r;
    data[index + 1] = g;
    data[index + 2] = b;
    data[index + 3] = a;
  };

  context(setVoxelSizeFunction, setVoxelColorFunction);

  return new Texture3D(data, s_x, s_y, s_z);
}
