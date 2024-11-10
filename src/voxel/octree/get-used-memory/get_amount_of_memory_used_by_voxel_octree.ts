import { BytesBuffer, read_u32_be, SIZEOF_U32, u32, u8 } from '@lifaon/math';
import { SIZEOF_VOXEL_MATERIAL } from '../../material/read-write/sizeof_voxel_material.constant';
import { SIZEOF_VOXEL_OCTREE } from '../read-write/sizeof_voxel_octree.constant';
import { NO_MATERIAL } from '../special-addresses.constant';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';

/**
 * Returns the amount of memory that a `voxelOctree` uses, including the size taken by its materials.
 */
export function get_amount_of_memory_used_by_voxel_octree(
  buffer: BytesBuffer,
  voxelOctreeAddress: u32,
  exploredOctreeAddresses: Uint8Array,
): u32 {
  if (exploredOctreeAddresses[voxelOctreeAddress] === 0) {
    exploredOctreeAddresses[voxelOctreeAddress] = 1;
    let size: u32 = SIZEOF_VOXEL_OCTREE;
    let voxelOctreeChildAddressAddress: u32 = voxelOctreeAddress + 1;
    for (let i: u8 = 0; i < 8; i++) {
      const voxelOctreeChildAddress: u32 = read_u32_be(buffer, voxelOctreeChildAddressAddress);
      if (is_voxel_octree_child_index_a_voxel_octree_address(buffer, voxelOctreeAddress, i)) {
        size += get_amount_of_memory_used_by_voxel_octree(
          buffer,
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
