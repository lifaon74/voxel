import { u8 } from '@lifaon/math';

export interface MemoryWriterNextU8Trait {
  next_u8(value: u8): void;
}
