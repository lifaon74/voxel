import { u8 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriteU8Trait {
  write_u8(address: MemoryAddress, value: u8): void;
}
