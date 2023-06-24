import { u32, u8 } from '@lifaon/number-types';
import { VOXEL_OCTREE_BYTE_SIZE } from '../../voxel-octree-byte-size.constant';

export function get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return (voxelOctreeDepth === 0)
    ? VOXEL_OCTREE_BYTE_SIZE
    : (VOXEL_OCTREE_BYTE_SIZE + (8 * get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth(voxelOctreeDepth - 1)));
}
