import { u8 } from '@lifaon/math';
import { IMemory } from '../../../memory/memory.type';
import { IMemoryAddress } from '../../../memory/types/memory-address.type';

export function write_voxel_material_in_memory(
  memory: IMemory,
  voxelMaterialAddress: IMemoryAddress,
  r: u8,
  g: u8,
  b: u8,
): void {
  // memory.setUint8(voxelMaterialAddress, r);
  // memory.setUint8(voxelMaterialAddress + 1, g);
  // memory.setUint8(voxelMaterialAddress + 2, b);
  memory[voxelMaterialAddress] = r;
  memory[voxelMaterialAddress + 1] = g;
  memory[voxelMaterialAddress + 2] = b;
}
