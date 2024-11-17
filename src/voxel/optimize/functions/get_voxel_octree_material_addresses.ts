import { u32, u8 } from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../../memory/read/readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { NO_MATERIAL } from '../../octree/special-addresses.constant';
import { get_voxel_octree_child_memory_address_from_voxel_octree_child_index } from '../../octree/voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';

export type GetVoxelOctreeMaterialAddressesMemory = MemoryReadU8Trait & MemoryReadU32BETrait;

/**
 * Returns all the places in memory where a `<voxelOctreeMaterialAddress>` has been found.
 */
export function get_voxel_octree_material_addresses(
  memory: GetVoxelOctreeMaterialAddressesMemory,
  voxelOctreeAddress: u32,
  voxelOctreeMaterialAddresses: Set<u32> = new Set<u32>(),
): Set<u32> {
  const mask: u8 = memory.read_u8(voxelOctreeAddress);

  for (let voxelOctreeChildIndex: u8 = 0; voxelOctreeChildIndex < 8; voxelOctreeChildIndex++) {
    const voxelOctreeChildAddressAddress: u32 =
      get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      );

    const voxelOctreeChildAddress: u32 = memory.read_u32_be(voxelOctreeChildAddressAddress);

    // if true => is a `voxelOctreeAddress`, else it's a `voxelMaterialAddress`.
    if (mask & (1 << voxelOctreeChildIndex)) {
      get_voxel_octree_material_addresses(
        memory,
        voxelOctreeChildAddress,
        voxelOctreeMaterialAddresses,
      );
    } else {
      if (voxelOctreeChildAddress !== NO_MATERIAL) {
        voxelOctreeMaterialAddresses.add(voxelOctreeChildAddressAddress);
      }
    }
  }

  return voxelOctreeMaterialAddresses;
}
