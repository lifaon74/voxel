import { u32 } from '@lifaon/math';
import { IMemory } from '../../memory.type';
import { IMemoryAddress } from '../../types/memory-address.type';
import { IMemoryAllocFunction } from '../../types/memory-alloc-function.type';

export function create_memory_alloc_function(memory: IMemory): IMemoryAllocFunction {
  let _allocated: u32 = 0;

  return (size: u32): IMemoryAddress => {
    if (size === 0) {
      return _allocated;
    } else {
      const index: number = _allocated;
      _allocated += size;
      if (_allocated > memory.byteLength) {
        throw new Error(`Alloc failed: not enough memory`);
      }
      return index;
    }
  };
}
