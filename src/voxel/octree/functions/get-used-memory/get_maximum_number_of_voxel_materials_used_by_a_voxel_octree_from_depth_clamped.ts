import { u32, u8 } from '@lifaon/math';
import {
  get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth,
} from './get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth';

/**
 *  Returns the real maximum number of materials that a `voxelOctree` may use (considering the hard limit of the memory).
 */
export function get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped(
  voxelOctreeDepth: u8,
): u32 {
  return Math.min(get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth(voxelOctreeDepth), (2 ** 30) - 3);
}
