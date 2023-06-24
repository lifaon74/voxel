import { u32, u8 } from '../../../../../number-types/dist';
import { U32_BYTE_SIZE } from '../../../memory/operations/u32-byte-size.constant';

export function get_memory_address_offset_from_voxel_octree_child_index(
  voxelOctreeChildIndex: u8,
): u32 {
  return 1 + voxelOctreeChildIndex * U32_BYTE_SIZE;
}
