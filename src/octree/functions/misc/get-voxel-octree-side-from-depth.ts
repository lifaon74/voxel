import { u8 } from '@lifaon/number-types';

export function get_voxel_octree_side_from_depth(
  voxelOctreeDepth: u8,
): number {
  return 2 << voxelOctreeDepth;
}
