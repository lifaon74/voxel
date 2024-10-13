import { math_floor, u32 } from '@lifaon/math';
import { ISetVoxelColorFunction } from '../../set-voxel-color-function.type';

export function draw_rainbow_cube_into_set_voxel_color_function(
  side: u32,
  setVoxelColorFunction: ISetVoxelColorFunction,
): void {
  const f: number = 255 / side;

  for (let z: u32 = 0; z < side; z++) {
    for (let y: u32 = 0; y < side; y++) {
      for (let x: u32 = 0; x < side; x++) {
        setVoxelColorFunction(
          x,
          y,
          z,
          math_floor(x * f),
          math_floor(y * f),
          math_floor(z * f),
          255,
        );
      }
    }
  }
}
