import { u32 } from '@lifaon/math';

export interface ISizeVoxChunk {
  readonly type: 'size';
  readonly x: u32;
  readonly y: u32;
  readonly z: u32;
}
