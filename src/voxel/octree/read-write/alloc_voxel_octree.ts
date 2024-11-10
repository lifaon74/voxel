import { u32 } from '@lifaon/math';
import { MemoryAllocTrait } from '../../../memory/shared/dynamic/traits/methods/memory.alloc.trait';
import { SIZEOF_VOXEL_OCTREE } from './sizeof_voxel_octree.constant';

export function alloc_voxel_octree(memory: MemoryAllocTrait): u32 {
  return memory.alloc(SIZEOF_VOXEL_OCTREE);
}
