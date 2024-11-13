import { u8, vec3_u32 } from '@lifaon/math';

/**
 * Returns the index ∈[0-8[ of the child of a `voxelOctree` from a specific depth and position.
 */
export function get_voxel_octree_child_index_from_position_3d(
  voxelOctreeDepth: u8,
  position: vec3_u32,
): u8 {
  return (
    (((position[0] >> voxelOctreeDepth) & 0x1) |
      (((position[1] >> voxelOctreeDepth) & 0x1) << 1) |
      (((position[2] >> voxelOctreeDepth) & 0x1) << 2)) >>>
    0
  );
}
