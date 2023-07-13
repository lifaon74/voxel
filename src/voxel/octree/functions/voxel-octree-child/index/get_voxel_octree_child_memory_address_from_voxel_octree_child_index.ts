import { u8 } from '@lifaon/math';
import { IMemoryAddress } from '../../../../memory/types/memory-address.type';
import { get_memory_address_offset_from_voxel_octree_child_index } from './get_memory_address_offset_from_voxel_octree_child_index';

/**
 * Returns the `memoryAddress` to get the `voxelOctreeChild` located at the index `voxelOctreeChildIndex`.
 */
export function get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeChildIndex: u8,
): IMemoryAddress {
  return voxelOctreeAddress
    + get_memory_address_offset_from_voxel_octree_child_index(voxelOctreeChildIndex);
}
