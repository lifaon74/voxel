import { u32, u8 } from '@lifaon/math';
import { SIZEOF_U32 } from '../../../../memory/functions/read-write/u32/sizeof_u32.constant';
import { SIZEOF_U8 } from '../../../../memory/functions/read-write/u8/sizeof_u8.constant';

/**
 * Returns the `memoryAddress` offset to apply to a `voxelOctreeAddress` to get the `voxelOctreeChild` located at the index `voxelOctreeChildIndex`.
 */
export function get_memory_address_offset_from_voxel_octree_child_index(
  voxelOctreeChildIndex: u8,
): u32 {
  return SIZEOF_U8 + voxelOctreeChildIndex * SIZEOF_U32;
}
