import { IXYZIVoxel } from './xyzi-voxel.type';

export interface IXYZIVoxChunk {
  readonly type: 'xyzi';
  readonly voxels: readonly IXYZIVoxel[];
}
