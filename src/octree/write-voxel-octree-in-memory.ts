import { IMemoryAddress } from '../memory/memory-address.type';
import { IMemory } from '../memory/memory.type';
import { U32_BYTE_SIZE } from '../memory/operations/u32-byte-size.constant';
import { write_u32_in_memory } from '../memory/operations/write-u32-in-memory';
import { NO_MATERIAL } from './special-addresses.constant';

export function write_voxel_octree_in_memory(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelMaterialAddress: IMemoryAddress = NO_MATERIAL,
): void {
  memory[voxelOctreeAddress++] = 0b00000000;
  for (let i = 0; i < 8; i++) {
    write_u32_in_memory(memory, voxelOctreeAddress, voxelMaterialAddress);
    voxelOctreeAddress += U32_BYTE_SIZE;
  }
}
