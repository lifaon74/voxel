import { u32, u8 } from '@lifaon/math';
import { ReadonlyMemoryTrait } from '../../../memory/read/readonly/traits/readonly-memory.trait';

export interface VoxelOctreeInSharedMemory {
  readonly address: u32;
  readonly depth: u8;
}

export interface VoxelOctreeWithOwnMemory {
  readonly memory: ReadonlyMemoryTrait;
  readonly address: u32;
  readonly depth: u8;
}
