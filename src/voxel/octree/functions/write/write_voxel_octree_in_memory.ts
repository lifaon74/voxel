import { IMemoryAddress } from '../../../memory/types/memory-address.type';
import { IMemory } from '../../../memory/memory.type';
import { SIZEOF_U32 } from '../../../memory/functions/read-write/u32/sizeof_u32.constant';
import { write_u32_be_in_memory } from '../../../memory/functions/read-write/u32/write_u32_be_in_memory';
import { write_u8_in_memory } from '../../../memory/functions/read-write/u8/write_u8_in_memory';

export function write_voxel_octree_in_memory(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelMaterialAddress: IMemoryAddress,
): void {
  write_u8_in_memory(
    memory,
    voxelOctreeAddress,
    0b00000000,
  );
  voxelOctreeAddress++;

  for (let i: number = 0; i < 8; i++) {
    write_u32_be_in_memory(
      memory,
      voxelOctreeAddress,
      voxelMaterialAddress,
    );
    voxelOctreeAddress += SIZEOF_U32;
  }
}
