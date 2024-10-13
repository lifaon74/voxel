import { UnknownVoxChunk } from '../unknown/unknown-vox-chunk';
import { VoxChunk } from '../vox-chunk';

export interface MainVoxChunk extends VoxChunk<'main'> {
  readonly children: readonly UnknownVoxChunk[];
}
