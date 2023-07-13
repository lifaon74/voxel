import { u32 } from '@lifaon/math';

export interface ISetVoxelSizeFunction {
  (
    // size
    x: u32,
    y: u32,
    z: u32,
  ): void,
}
