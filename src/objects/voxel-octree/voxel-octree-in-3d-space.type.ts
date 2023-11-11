import { u8 } from '@lifaon/math';
import { IObjectIn3dSpace } from '../object/object-in-3d-space.type';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';

export interface IVoxelOctreeIn3dSpace extends IObjectIn3dSpace {
  readonly memory: IMemory;
  readonly address: IMemoryAddress;
  readonly depth: u8;
}
