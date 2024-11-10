import { f32, u32 } from '@lifaon/math';

export interface MemoryWriterNextF32BETrait {
  next_f32_be(value: f32): void;
}
