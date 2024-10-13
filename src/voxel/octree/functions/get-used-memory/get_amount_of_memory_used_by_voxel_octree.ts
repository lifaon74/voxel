import { u32, u8 } from '@lifaon/math';
import { SIZEOF_VOXEL_MATERIAL } from '../../../material/constants/sizeof_voxel_material.constant';
import { IMemoryAddress } from '../../../memory/types/memory-address.type';
import { IMemory } from '../../../memory/memory.type';
import { read_u32_be_from_memory } from '../../../memory/functions/read-write/u32/read_u32_be_from_memory';
import { SIZEOF_U32 } from '../../../memory/functions/read-write/u32/sizeof_u32.constant';
import { NO_MATERIAL } from '../../special-addresses.constant';
import { SIZEOF_VOXEL_OCTREE } from '../../constants/sizeof_voxel_octree.constant';
import {
  is_voxel_octree_child_index_a_voxel_octree_address,
} from '../voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';

/**
 * Returns the amount of memory that a `voxelOctree` uses, including the size taken by its materials.
 */
export function get_amount_of_memory_used_by_voxel_octree(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  exploredOctreeAddresses: Uint8Array,
): u32 {
  if (exploredOctreeAddresses[voxelOctreeAddress] === 0) {
    exploredOctreeAddresses[voxelOctreeAddress] = 1;
    let size: u32 = SIZEOF_VOXEL_OCTREE;
    let voxelOctreeChildAddressAddress: IMemoryAddress = voxelOctreeAddress + 1;
    for (let i: u8 = 0; i < 8; i++) {
      const voxelOctreeChildAddress: IMemoryAddress = read_u32_be_from_memory(
        memory,
        voxelOctreeChildAddressAddress,
      );
      if (
        is_voxel_octree_child_index_a_voxel_octree_address(
          memory,
          voxelOctreeAddress,
          i,
        )
      ) {
        size += get_amount_of_memory_used_by_voxel_octree(
          memory,
          voxelOctreeChildAddress,
          exploredOctreeAddresses,
        );
      } else if (voxelOctreeChildAddress !== NO_MATERIAL) {
        size += SIZEOF_VOXEL_MATERIAL;
      }
      voxelOctreeChildAddressAddress += SIZEOF_U32;
    }
    return size;
  } else {
    return 0;
  }
}
