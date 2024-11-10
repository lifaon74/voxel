import { f32, u32 } from '@lifaon/math';

export interface MemoryWriterNextF32LETrait {
  next_f32_le(value: f32): void;
}
