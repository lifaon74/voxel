import { u8 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReadU8Trait {
  read_u8(address: MemoryAddress): u8;
}
