import { SIZEOF_U32, SIZEOF_U8, u32, u8 } from '@lifaon/math';

/**
 * Returns the `memoryAddress` offset to apply to a `voxelOctreeAddress` to get the `voxelOctreeChild` located at the index `voxelOctreeChildIndex`.
 */
export function get_memory_address_offset_from_voxel_octree_child_index(
  voxelOctreeChildIndex: u8,
): u32 {
  return SIZEOF_U8 + voxelOctreeChildIndex * SIZEOF_U32;
}
