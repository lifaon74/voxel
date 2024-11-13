import { mat4, mat4_create, u32, u8 } from '@lifaon/math';
import { ReadonlyMemoryTrait } from '../../../memory/read/readonly/traits/readonly-memory.trait';

export interface VoxelOctreeIn3DSpaceOptions {
  readonly memory: ReadonlyMemoryTrait;
  readonly address: u32;
  readonly depth: u8;
}

export class VoxelOctreeIn3DSpace {
  memory: ReadonlyMemoryTrait;
  address: u32;
  depth: u8;
  matrix: mat4;

  constructor({ memory, address, depth }: VoxelOctreeIn3DSpaceOptions) {
    this.memory = memory;
    this.address = address;
    this.depth = depth;
    this.matrix = mat4_create();
  }
}
