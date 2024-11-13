import { u32, u8 } from '@lifaon/math';

/**
 * Returns the index ∈[0-8[ of the child of a `voxelOctree` from a specific depth and position.
 * @deprecated
 */
export function get_voxel_octree_child_index_from_position_xyz(
  voxelOctreeDepth: u8,
  // position
  x: u32,
  y: u32,
  z: u32,
): u8 {
  return (
    (((x >> voxelOctreeDepth) & 0x1) |
      (((y >> voxelOctreeDepth) & 0x1) << 1) |
      (((z >> voxelOctreeDepth) & 0x1) << 2)) >>>
    0
  );
}
