import { u32 } from '@lifaon/math';
import { MemoryWriteU32BETrait } from '../../../memory/write/writeonly/traits/methods/memory.write_u32_be.trait';
import {
  get_voxel_octrees_material_addresses,
  GetVoxelOctreesMaterialAddressesMemory,
} from './get_voxel_octrees_material_addresses';

export type DeduplicateVoxelOctreesMaterialsMemory = GetVoxelOctreesMaterialAddressesMemory &
  MemoryWriteU32BETrait;

export function deduplicate_voxel_octrees_materials(
  memory: DeduplicateVoxelOctreesMaterialsMemory,
  voxelOctreeAddresses: readonly u32[],
): void {
  const voxelOctreeMaterialAddresses: Set<u32> = get_voxel_octrees_material_addresses(
    memory,
    voxelOctreeAddresses,
  );

  const mappedMaterials = new Map<u32 /* voxelOctreeMaterial */, u32 /* voxelMaterialAddress */>();

  for (const voxelOctreeMaterialAddress of voxelOctreeMaterialAddresses.values()) {
    const voxelMaterialAddress: u32 = memory.read_u32_be(voxelOctreeMaterialAddress);

    const voxelOctreeMaterial: u32 =
      (memory.read_u8(voxelMaterialAddress) << 16) |
      (memory.read_u8(voxelMaterialAddress + 1) << 8) |
      memory.read_u8(voxelMaterialAddress + 2);

    const mappedVoxelMaterialAddress: u32 | undefined = mappedMaterials.get(voxelOctreeMaterial);

    if (mappedVoxelMaterialAddress === undefined) {
      mappedMaterials.set(voxelOctreeMaterial, voxelMaterialAddress);
    } else {
      memory.write_u32_be(voxelOctreeMaterialAddress, mappedVoxelMaterialAddress);
    }
  }
}
