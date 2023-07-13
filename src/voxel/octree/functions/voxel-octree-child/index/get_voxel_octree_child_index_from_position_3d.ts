import { u8 } from '@lifaon/math';
import { IVoxelOctreePosition3d } from '../../../types/voxel-octree-position-3d.type';

/**
 * Returns the index ∈[0-8[ of the child of a `voxelOctree` from a specific depth and position
 */
export function get_voxel_octree_child_index_from_position_3d(
  voxelOctreeDepth: u8,
  position: IVoxelOctreePosition3d,
): u8 {
  return (
    ((position[0] >> voxelOctreeDepth) & 0x1)
    | (((position[1] >> voxelOctreeDepth) & 0x1) << 1)
    | (((position[2] >> voxelOctreeDepth) & 0x1) << 2)
  ) >>> 0;
}
