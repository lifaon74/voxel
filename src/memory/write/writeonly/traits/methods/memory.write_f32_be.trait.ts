import { f32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriteF32BETrait {
  write_f32_be(address: MemoryAddress, value: f32): void;
}
