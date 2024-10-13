import { u8 } from '@lifaon/math';
import { IMemory } from '../../../memory.type';
import { IMemoryAddress } from '../../../types/memory-address.type';

export function read_u8_from_memory(memory: IMemory, address: IMemoryAddress): u8 {
  // return memory.getUint8(address);
  return memory[address];
}
