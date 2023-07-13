import { IXYZIVoxel } from './xyzi-voxel.type';

export interface IXYZIVoxChunk {
  type: 'xyzi';
  voxels: IXYZIVoxel[];
}
