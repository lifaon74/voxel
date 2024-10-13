import { u32 } from '@lifaon/math';
import { VoxChunk } from '../vox-chunk';

export interface PackVoxChunk extends VoxChunk<'pack'> {
  readonly numberOfModels: u32;
}
