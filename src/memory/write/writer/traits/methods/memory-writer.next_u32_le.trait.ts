import { u32 } from '@lifaon/math';

export interface MemoryWriterNextU32LETrait {
  next_u32_le(value: u32): void;
}
