import { u32, u8 } from '@lifaon/math';

/**
 * Returns the side length of a `voxelOctree` from its depth.
 */
export function voxel_octree_depth_to_side(voxelOctreeDepth: u8): u32 {
  return 2 << voxelOctreeDepth;
}
