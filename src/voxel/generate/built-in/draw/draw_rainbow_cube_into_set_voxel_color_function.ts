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
