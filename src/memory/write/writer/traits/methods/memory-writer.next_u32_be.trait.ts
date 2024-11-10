import { u32 } from '@lifaon/math';

export interface MemoryWriterNextU32BETrait {
  next_u32_be(value: u32): void;
}
