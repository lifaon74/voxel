import { u32, u8, vec3_create_u32, vec3_u32 } from '@lifaon/math';
import { draw_rainbow_cube_into_set_voxel_color_function } from '../../voxel/generate/built-in/draw/draw_rainbow_cube_into_set_voxel_color_function';
import { allocate_and_write_voxel_material_in_memory } from '../../voxel/material/functions/allocate/allocate_and_write_voxel_material_in_memory';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';
import { IMemoryAllocFunction } from '../../voxel/memory/types/memory-alloc-function.type';
import { voxel_octree_depth_to_side } from '../../voxel/octree/functions/depth-side/voxel_octree_depth_to_side';
import { allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position } from '../../voxel/octree/functions/voxel-material/at-position/allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position';
import { NO_MATERIAL } from '../../voxel/octree/special-addresses.constant';

export function generateRainbowVoxelOctree(
  memory: IMemory,
  alloc: IMemoryAllocFunction,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
): void {
  const side: u32 = voxel_octree_depth_to_side(voxelOctreeDepth);

  const POSITION: vec3_u32 = vec3_create_u32();

  draw_rainbow_cube_into_set_voxel_color_function(side, (x, y, z, r, g, b, a) => {
    POSITION[0] = x;
    POSITION[1] = y;
    POSITION[2] = z;

    const voxelMaterialAddress: IMemoryAddress =
      a === 255 ? allocate_and_write_voxel_material_in_memory(memory, alloc, r, g, b) : NO_MATERIAL;

    allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
      memory,
      alloc,
      voxelOctreeAddress,
      voxelOctreeDepth,
      POSITION,
      voxelMaterialAddress,
    );
  });
}
