import { SIZEOF_U32, u32 } from '@lifaon/math';
import { MemoryWriteU32BETrait } from '../../../memory/write/writeonly/traits/methods/memory.write_u32_be.trait';
import { MemoryWriteU8Trait } from '../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';

export function write_voxel_octree(
  memory: MemoryWriteU8Trait & MemoryWriteU32BETrait,
  voxelOctreeAddress: u32,
  voxelMaterialAddress: u32,
): void {
  memory.write_u8(voxelOctreeAddress, 0b00000000);
  voxelOctreeAddress++;

  for (let i: number = 0; i < 8; i++) {
    memory.write_u32_be(voxelOctreeAddress, voxelMaterialAddress);
    voxelOctreeAddress += SIZEOF_U32;
  }
}
