import { mat4, mat4_create, u8 } from '@lifaon/math';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';

export interface IVoxelOctreeOptions {
  readonly memory: IMemory;
  readonly address: IMemoryAddress;
  readonly depth: u8;
}

export class VoxelOctree {
  memory: IMemory;
  address: IMemoryAddress;
  depth: u8;
  matrix: mat4;

  constructor({ memory, address, depth }: IVoxelOctreeOptions) {
    this.memory = memory;
    this.address = address;
    this.depth = depth;
    this.matrix = mat4_create();
  }
}
