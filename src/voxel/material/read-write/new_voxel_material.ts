import { u32, u8 } from '@lifaon/math';
import { MemoryAllocTrait } from '../../../memory/shared/dynamic/traits/methods/memory.alloc.trait';
import { MemoryWriteU8Trait } from '../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';
import { alloc_voxel_material } from './alloc_voxel_material';
import { write_voxel_material } from './write_voxel_material';

export type NewVoxelMaterialMemory = MemoryAllocTrait & MemoryWriteU8Trait;

export function new_voxel_material(memory: NewVoxelMaterialMemory, r: u8, g: u8, b: u8): u32 {
  const voxelMaterialAddress: u32 = alloc_voxel_material(memory);
  write_voxel_material(memory, voxelMaterialAddress, r, g, b);
  return voxelMaterialAddress;
}
