import { usize } from '@lifaon/math';
import { MemoryAddress } from '../../../memory-address';

export interface MemoryAllocTrait {
  alloc(size: usize): MemoryAddress;
}
