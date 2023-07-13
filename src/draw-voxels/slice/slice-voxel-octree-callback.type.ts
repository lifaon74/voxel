import { u8 } from '@lifaon/math';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';

export interface ISliceVoxelOctreeCallback {
  (
    memory: IMemory,
    voxelOctreeAddress: IMemoryAddress,
    voxelOctreeDepth: u8,
    x: number,
    y: number,
  ): IMemoryAddress;
}
