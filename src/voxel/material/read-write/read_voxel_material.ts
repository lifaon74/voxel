import { u32 } from '@lifaon/math';
import { MemoryReadU8Trait } from '../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { VoxelMaterial } from './voxel-material';

export function read_voxel_material(
  memory: MemoryReadU8Trait,
  voxelMaterialAddress: u32,
): VoxelMaterial {
  return [
    memory.read_u8(voxelMaterialAddress),
    memory.read_u8(voxelMaterialAddress + 1),
    memory.read_u8(voxelMaterialAddress + 2),
  ];
}

// export function read_voxel_material(
//   memory: MemoryBytesTrait,
//   voxelMaterialAddress: u32,
// ): VoxelMaterial {
//   return memory.bytes.subarray(voxelMaterialAddress, 3) as unknown as VoxelMaterial;
// }
