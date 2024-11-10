import { f32, u32 } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReadU32LETrait {
  read_u32_le(address: MemoryAddress): u32;
}
