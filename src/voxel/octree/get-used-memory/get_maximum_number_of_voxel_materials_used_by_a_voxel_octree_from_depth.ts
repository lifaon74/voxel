import { u32, u8 } from '@lifaon/math';
import { voxel_octree_depth_to_side } from '../depth-side/voxel_octree_depth_to_side';

/**
 * Returns the maximum number of materials that a `voxelOctree` may use.
 */
export function get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return voxel_octree_depth_to_side(voxelOctreeDepth) ** 3;
}
