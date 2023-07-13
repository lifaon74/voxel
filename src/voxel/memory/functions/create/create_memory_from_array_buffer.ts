import { IMemory } from '../../memory.type';

export function create_memory_from_array_buffer(
  buffer: ArrayBuffer,
): IMemory {
  return new Uint8Array(buffer);
}
