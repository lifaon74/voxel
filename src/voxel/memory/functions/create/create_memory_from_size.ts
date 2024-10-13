import { u32 } from '@lifaon/math';
import { IMemory } from '../../memory.type';
import { create_memory_from_array_buffer } from './create_memory_from_array_buffer';

export function create_memory_from_size(size: u32): IMemory {
  return create_memory_from_array_buffer(new ArrayBuffer(size));
}
