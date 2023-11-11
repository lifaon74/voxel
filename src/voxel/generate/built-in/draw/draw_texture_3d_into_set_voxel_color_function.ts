import { math_floor, u32, u8, vec3_create_u32, vec3_u32 } from '@lifaon/math';
import { allocate_and_write_voxel_material_in_memory } from '../../../material/functions/allocate/allocate_and_write_voxel_material_in_memory';
import { IMemory } from '../../../memory/memory.type';
import { IMemoryAddress } from '../../../memory/types/memory-address.type';
import { IMemoryAllocFunction } from '../../../memory/types/memory-alloc-function.type';
import { voxel_octree_depth_to_side } from '../../../octree/functions/depth-side/voxel_octree_depth_to_side';
import {
  allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position,
} from '../../../octree/functions/voxel-material/at-position/allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position';
import { ISetVoxelColorFunction } from '../../set-voxel-color-function.type';
import { Texture3D } from '../../../texture-3d/texture-3d.class';

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
