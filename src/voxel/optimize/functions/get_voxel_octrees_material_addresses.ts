import { u32 } from '@lifaon/math';
import {
  get_voxel_octree_material_addresses,
  GetVoxelOctreeMaterialAddressesMemory,
} from './get_voxel_octree_material_addresses';

export type GetVoxelOctreesMaterialAddressesMemory = GetVoxelOctreeMaterialAddressesMemory;

/**
 * Returns all the places in memory where a `<voxelOctreeMaterialAddress>` has been found.
 */
export function get_voxel_octrees_material_addresses(
  memory: GetVoxelOctreesMaterialAddressesMemory,
  voxelOctreeAddresses: readonly u32[],
  voxelOctreeMaterialAddresses: Set<u32> = new Set<u32>(),
): Set<u32> {
  for (let i: number = 0; i < voxelOctreeAddresses.length; i++) {
    get_voxel_octree_material_addresses(
      memory,
      voxelOctreeAddresses[i],
      voxelOctreeMaterialAddresses,
    );
  }

  return voxelOctreeMaterialAddresses;
}
