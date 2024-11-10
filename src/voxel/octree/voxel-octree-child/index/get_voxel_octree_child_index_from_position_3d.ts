import { u8 } from '@lifaon/math';
import { VoxelOctreePosition3D } from '../../types/voxel-octree-position-3d';

/**
 * Returns the index ∈[0-8[ of the child of a `voxelOctree` from a specific depth and position.
 */
export function get_voxel_octree_child_index_from_position_3d(
  voxelOctreeDepth: u8,
  position: VoxelOctreePosition3D,
): u8 {
  return (
    (((position[0] >> voxelOctreeDepth) & 0x1) |
      (((position[1] >> voxelOctreeDepth) & 0x1) << 1) |
      (((position[2] >> voxelOctreeDepth) & 0x1) << 2)) >>>
    0
  );
}
