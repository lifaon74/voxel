import { f32, u32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriteU32LETrait {
  write_u32_le(address: MemoryAddress, value: u32): void;
}
