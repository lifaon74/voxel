import { u32, u8 } from '@lifaon/number-types';
import { IMemoryAddress } from '../../../memory/memory-address.type';
import { IMemory } from '../../../memory/memory.type';
import { read_u32_from_memory } from '../../../memory/operations/read-u32-from-memory';
import { get_voxel_octree_child_index_from_3d_position } from '../misc/get-voxel-octree-child-index-from-3d-position';
import {
  get_voxel_octree_child_memory_address_from_voxel_octree_child_index,
} from '../misc/get-voxel-octree-child-memory-address-from-voxel-octree-child-index';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../misc/is-voxel-octree-child-index-a-voxel-octree-address';

export function read_voxel_material_address_of_voxel_octree_at_position(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: IMemoryAddress,
  x: u32,
  y: u32,
  z: u32,
): IMemoryAddress {
  while (voxelOctreeDepth >= 0) {
    const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_3d_position(voxelOctreeDepth, x, y, z);
    const voxelOctreeChildAddress: IMemoryAddress = read_u32_from_memory(memory, get_voxel_octree_child_memory_address_from_voxel_octree_child_index(voxelOctreeAddress, voxelOctreeChildIndex));
    if (is_voxel_octree_child_index_a_voxel_octree_address(memory, voxelOctreeAddress, voxelOctreeChildIndex)) {
      voxelOctreeAddress = voxelOctreeChildAddress;
      voxelOctreeDepth--;
    } else {
      return voxelOctreeChildAddress;
    }
  }
  throw new Error('Invalid coords');
}





