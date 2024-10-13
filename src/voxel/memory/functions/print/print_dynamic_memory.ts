import { IMemory } from '../../memory.type';
import { IMemoryAllocFunction } from '../../types/memory-alloc-function.type';

export function print_dynamic_memory(memory: IMemory, alloc: IMemoryAllocFunction): void {
  console.log(memory.buffer.slice(0, alloc(0)));
}
