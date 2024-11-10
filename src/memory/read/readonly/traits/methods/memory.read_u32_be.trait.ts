import { f32, u32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReadU32BETrait {
  read_u32_be(address: MemoryAddress): u32;
}
