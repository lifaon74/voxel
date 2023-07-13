import { u32 } from '@lifaon/math';

export interface ISizeVoxChunk {
  type: 'size';
  x: u32;
  y: u32;
  z: u32;
}
