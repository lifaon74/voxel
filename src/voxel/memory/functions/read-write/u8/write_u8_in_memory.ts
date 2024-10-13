import { u8 } from '@lifaon/math';
import { IMemory } from '../../../memory.type';
import { IMemoryAddress } from '../../../types/memory-address.type';

export function write_u8_in_memory(memory: IMemory, address: IMemoryAddress, value: u8): void {
  // memory.setUint8(address, value);
  memory[address] = value;
}
