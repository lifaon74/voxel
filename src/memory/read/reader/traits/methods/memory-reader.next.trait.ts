import { usize } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReaderNextTrait {
  next(size: usize): MemoryAddress;
}
