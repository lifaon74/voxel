import { u8 } from '@lifaon/math';
import { read_u32_be_from_memory } from '../../../../memory/functions/read-write/u32/read_u32_be_from_memory';
import { IMemory } from '../../../../memory/memory.type';
import { IMemoryAddress } from '../../../../memory/types/memory-address.type';
import { IVoxelOctreePosition3d } from '../../../types/voxel-octree-position-3d.type';
import {
  get_voxel_octree_child_index_from_position_3d
} from '../../voxel-octree-child/index/get_voxel_octree_child_index_from_position_3d';
import {
  get_voxel_octree_child_memory_address_from_voxel_octree_child_index
} from '../../voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';
import {
  is_voxel_octree_child_index_a_voxel_octree_address
} from '../../voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';

/**
 * Reads the `voxelMaterialAddress` located at a specific position of a `voxelOctree`.
 */
export function read_voxel_material_address_of_voxel_octree_at_position(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
  position: IVoxelOctreePosition3d,
): IMemoryAddress {
  while (voxelOctreeDepth >= 0) {
    const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_position_3d(
      voxelOctreeDepth,
      position,
    );

    const voxelOctreeChildAddress: IMemoryAddress = read_u32_be_from_memory(
      memory,
      get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      ),
    );

    if (
      is_voxel_octree_child_index_a_voxel_octree_address(
        memory,
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      )
    ) {
      voxelOctreeAddress = voxelOctreeChildAddress;
      voxelOctreeDepth--;
    } else {
      return voxelOctreeChildAddress;
    }
  }
  throw new Error('Invalid coords');
}
