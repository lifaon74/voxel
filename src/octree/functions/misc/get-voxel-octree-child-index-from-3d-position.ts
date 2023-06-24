import { u32, u8 } from '@lifaon/number-types';

export function get_voxel_octree_child_index_from_3d_position(
  voxelOctreeDepth: u8,
  x: u32,
  y: u32,
  z: u32,
): u8 {
  return (
    ((x >> voxelOctreeDepth) & 0x1)
    | (((y >> voxelOctreeDepth) & 0x1) << 1)
    | (((z >> voxelOctreeDepth) & 0x1) << 2)
  ) >>> 0;
}
