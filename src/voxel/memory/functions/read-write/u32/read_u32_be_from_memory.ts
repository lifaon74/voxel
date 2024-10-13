import { u32 } from '@lifaon/math';
import { IMemory } from '../../../memory.type';
import { IMemoryAddress } from '../../../types/memory-address.type';

/**
 * @deprecated use @lifaon/math
 */
export function read_u32_be_from_memory(memory: IMemory, address: IMemoryAddress): u32 {
  // return memory.getUint32(address);
  return (
    (memory[address] |
      (memory[address + 1] << 8) |
      (memory[address + 2] << 16) |
      (memory[address + 3] << 24)) >>>
    0
  );
}
