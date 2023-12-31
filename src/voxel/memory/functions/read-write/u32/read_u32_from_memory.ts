import { u32 } from '@lifaon/math';
import { IMemoryAddress } from '../../../types/memory-address.type';
import { IMemory } from '../../../memory.type';

export function read_u32_from_memory(
  memory: IMemory,
  address: IMemoryAddress,
): u32 {
  // return memory.getUint32(address);
  return (
    (memory[address])
    | (memory[address + 1] << 8)
    | (memory[address + 2] << 16)
    | (memory[address + 3] << 24)
  ) >>> 0;
}


