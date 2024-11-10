import { u32 } from '@lifaon/math';
import { MemoryAllocTrait } from '../../../memory/shared/dynamic/traits/methods/memory.alloc.trait';
import { SIZEOF_VOXEL_MATERIAL } from './sizeof_voxel_material.constant';

export function alloc_voxel_material(memory: MemoryAllocTrait): u32 {
  return memory.alloc(SIZEOF_VOXEL_MATERIAL);
}
