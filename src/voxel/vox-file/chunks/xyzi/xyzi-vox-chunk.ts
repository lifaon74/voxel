import { XYZIVoxel } from './xyzi-voxel';
import { VoxChunk } from '../vox-chunk';

export interface XYZIVoxChunk extends VoxChunk<'xyzi'>  {
  readonly voxels: readonly XYZIVoxel[];
}
