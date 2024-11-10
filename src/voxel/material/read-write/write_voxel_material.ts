import { u32, u8 } from '@lifaon/math';
import { MemoryWriteU8Trait } from '../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';

export function write_voxel_material(
  memory: MemoryWriteU8Trait,
  voxelMaterialAddress: u32,
  r: u8,
  g: u8,
  b: u8,
): void {
  memory.write_u8(voxelMaterialAddress, r);
  memory.write_u8(voxelMaterialAddress + 1, g);
  memory.write_u8(voxelMaterialAddress + 2, b);
}
