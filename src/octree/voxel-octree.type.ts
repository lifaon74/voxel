import { u8 } from '@lifaon/number-types';
import { IAllocFunction } from '../memory/alloc-function.type';
import { IMemoryAddress } from '../memory/memory-address.type';
import { createMemoryPointer, IMemoryPointer } from '../memory/memory-pointer';
import { IMemory } from '../memory/memory.type';
import { VOXEL_OCTREE_BYTE_SIZE } from './voxel-octree-byte-size.constant';
import { write_voxel_octree_in_memory } from './write-voxel-octree-in-memory';

export interface IVoxelOctree {
  pointer: IMemoryPointer;
  depth: u8;
}

export function createVoxelOctree(
  memory: IMemory,
  alloc: IAllocFunction,
  voxelOctreeDepth: u8,
  voxelMaterialAddress?: IMemoryAddress,
): IVoxelOctree {
  const voxelOctreeAddress: IMemoryAddress = alloc(VOXEL_OCTREE_BYTE_SIZE);
  write_voxel_octree_in_memory(memory, voxelOctreeAddress, voxelMaterialAddress);
  return {
    pointer: createMemoryPointer(
      memory,
      voxelOctreeAddress,
    ),
    depth: voxelOctreeDepth,
  };
}


