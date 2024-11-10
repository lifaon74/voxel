import { f32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReadF32LETrait {
  read_f32_le(address: MemoryAddress): f32;
}
