import { u32 } from '@lifaon/number-types';
import { VOXEL_MATERIAL_BYTE_SIZE } from '../../../material/voxel-material-byte-size.constant';
import { IMemoryAddress } from '../../../memory/memory-address.type';
import { IMemory } from '../../../memory/memory.type';
import { read_u32_from_memory } from '../../../memory/operations/read-u32-from-memory';
import { U32_BYTE_SIZE } from '../../../memory/operations/u32-byte-size.constant';
import { NO_MATERIAL } from '../../special-addresses.constant';
import { VOXEL_OCTREE_BYTE_SIZE } from '../../voxel-octree-byte-size.constant';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../misc/is-voxel-octree-child-index-a-voxel-octree-address';

export function get_amount_of_memory_used_by_voxel_octree(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  exploredOctreeAddresses: Uint8Array,
): u32 {
  if (exploredOctreeAddresses[voxelOctreeAddress] === 0) {
    exploredOctreeAddresses[voxelOctreeAddress] = 1;
    let size: u32 = VOXEL_OCTREE_BYTE_SIZE;
    let voxelOctreeChildAddressAddress: IMemoryAddress = voxelOctreeAddress + 1;
    for (let i = 0; i < 8; i++) {
      const voxelOctreeChildAddress: IMemoryAddress = read_u32_from_memory(memory, voxelOctreeChildAddressAddress);
      if (is_voxel_octree_child_index_a_voxel_octree_address(memory, voxelOctreeAddress, i)) {
        size += get_amount_of_memory_used_by_voxel_octree(memory, voxelOctreeChildAddress, exploredOctreeAddresses);
      } else if (voxelOctreeChildAddress !== NO_MATERIAL) {
        size += VOXEL_MATERIAL_BYTE_SIZE;
      }
      voxelOctreeChildAddressAddress += U32_BYTE_SIZE;
    }
    return size;
  } else {
    return 0;
  }
}
