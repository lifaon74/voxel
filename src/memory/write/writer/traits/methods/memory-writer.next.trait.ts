import { usize } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriterNextTrait {
  next(size: usize): MemoryAddress;
}
