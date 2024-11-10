import { u32, u8 } from '@lifaon/math';
import { ReadonlyMemoryTrait } from '../../memory/read/readonly/traits/readonly-memory.trait';
import { IObjectIn3dSpace } from '../object/object-in-3d-space.type';

export interface IVoxelOctreeIn3dSpace extends IObjectIn3dSpace {
  readonly memory: ReadonlyMemoryTrait;
  readonly address: u32;
  readonly depth: u8;
}
