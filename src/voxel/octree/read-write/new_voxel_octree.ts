import { u32 } from '@lifaon/math';
import { MemoryAllocTrait } from '../../../memory/shared/dynamic/traits/methods/memory.alloc.trait';
import { MemoryWriteU32BETrait } from '../../../memory/write/writeonly/traits/methods/memory.write_u32_be.trait';
import { MemoryWriteU8Trait } from '../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';
import { alloc_voxel_octree } from './alloc_voxel_octree';
import { write_voxel_octree } from './write_voxel_octree';

export type NewVoxelOctreeMemory = MemoryAllocTrait & MemoryWriteU8Trait & MemoryWriteU32BETrait;

export function new_voxel_octree(memory: NewVoxelOctreeMemory, voxelMaterialAddress: u32): u32 {
  const voxelOctreeAddress: u32 = alloc_voxel_octree(memory);
  write_voxel_octree(memory, voxelOctreeAddress, voxelMaterialAddress);
  return voxelOctreeAddress;
}
