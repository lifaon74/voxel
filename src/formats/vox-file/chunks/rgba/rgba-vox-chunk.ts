import { RGBAVoxColor } from './rgba-vox-color';
import { VoxChunk } from '../vox-chunk';

export interface RGBAVoxChunk extends VoxChunk<'rgba'> {
  readonly colors: readonly RGBAVoxColor[];
}
