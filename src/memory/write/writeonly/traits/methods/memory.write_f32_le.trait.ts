import { f32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriteF32LETrait {
  write_f32_le(address: MemoryAddress, value: f32): void;
}
