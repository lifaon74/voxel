import { u32 } from '@lifaon/math';
import { IMemoryAddress } from '../../../types/memory-address.type';
import { IMemory } from '../../../memory.type';

export function write_u32_be_in_memory(
  memory: IMemory,
  address: IMemoryAddress,
  value: u32,
): void {
  // memory.setUint32(address, value);
  memory[address] = value;
  memory[address + 1] = (value >>> 8);
  memory[address + 2] = (value >>> 16);
  memory[address + 3] = (value >>> 24);
}


