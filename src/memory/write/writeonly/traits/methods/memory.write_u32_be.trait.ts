import { f32, u32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriteU32BETrait {
  write_u32_be(address: MemoryAddress, value: u32): void;
}
