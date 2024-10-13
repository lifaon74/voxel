import { u32, u8 } from '@lifaon/math';
import {
  get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth
} from './get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth';
import {
  get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth
} from './get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth';

/**
 * Returns the maximum amount of memory that a `voxelOctree` may use (including its materials).
 */
export function get_maximum_amount_of_memory_used_by_a_voxel_octree_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return (
    get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth(
      voxelOctreeDepth,
    ) +
    get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth(
      voxelOctreeDepth,
    )
  );
}
