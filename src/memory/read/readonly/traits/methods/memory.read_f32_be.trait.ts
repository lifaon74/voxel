import { f32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReadF32BETrait {
  read_f32_be(address: MemoryAddress): f32;
}
