import { u8 } from '@lifaon/math';
import { IMemoryAddress } from '../../../types/memory-address.type';
import { IMemory } from '../../../memory.type';

export function write_u8_in_memory(
  memory: IMemory,
  address: IMemoryAddress,
  value: u8,
): void {
  // memory.setUint8(address, value);
  memory[address] = value;
}


