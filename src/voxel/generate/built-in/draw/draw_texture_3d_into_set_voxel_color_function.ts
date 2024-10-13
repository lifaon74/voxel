import { u32 } from '@lifaon/math';
import { Texture3D } from '../../../texture-3d/texture-3d.class';
import { ISetVoxelColorFunction } from '../../set-voxel-color-function.type';

export function draw_texture_3d_into_set_voxel_color_function(
  texture3d: Texture3D,
  setVoxelColorFunction: ISetVoxelColorFunction,
): void {
  let i: number = 0;

  for (let z: u32 = 0; z < texture3d.z; z++) {
    for (let y: u32 = 0; y < texture3d.y; y++) {
      for (let x: u32 = 0; x < texture3d.x; x++) {
        setVoxelColorFunction(
          x,
          y,
          z,
          texture3d.data[i++],
          texture3d.data[i++],
          texture3d.data[i++],
          texture3d.data[i++],
        );
      }
    }
  }
}
