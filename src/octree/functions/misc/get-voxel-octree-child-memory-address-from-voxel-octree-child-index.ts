import { u8 } from '../../../../../number-types/dist';
import { IMemoryAddress } from '../../../memory/memory-address.type';
import { get_memory_address_offset_from_voxel_octree_child_index } from './get-memory-address-offset-from-voxel-octree-child-index';

export function get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeChildIndex: u8,
): IMemoryAddress {
  return voxelOctreeAddress + get_memory_address_offset_from_voxel_octree_child_index(voxelOctreeChildIndex);
}
