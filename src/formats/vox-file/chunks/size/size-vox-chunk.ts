import { u32 } from '@lifaon/math';
import { VoxChunk } from '../vox-chunk';

export interface SizeVoxChunk extends VoxChunk<'size'> {
  readonly x: u32;
  readonly y: u32;
  readonly z: u32;
}
