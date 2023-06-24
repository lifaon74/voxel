import { u8 } from '@lifaon/number-types';
import { IMemoryAddress } from '../memory/memory-address.type';
import { IMemory } from '../memory/memory.type';

export function write_voxel_material_in_memory(
  memory: IMemory,
  voxelMaterialAddress: IMemoryAddress,
  r: u8,
  g: u8,
  b: u8,
): void {
  memory[voxelMaterialAddress] = r;
  memory[voxelMaterialAddress + 1] = g;
  memory[voxelMaterialAddress + 2] = b;
}
