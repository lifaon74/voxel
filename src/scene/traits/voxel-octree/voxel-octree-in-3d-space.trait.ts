import { mat4, u32, u8 } from '@lifaon/math';
import { ReadonlyMemoryTrait } from '../../../memory/read/readonly/traits/readonly-memory.trait';
import { ObjectIn3dSpaceTrait } from '../object/object-in3d-space.trait';

export interface VoxelOctreeIn3dSpaceTrait extends ObjectIn3dSpaceTrait {
  readonly memory: ReadonlyMemoryTrait;
  readonly address: u32;
  readonly depth: u8;
}
