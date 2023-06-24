import { IMemoryAddress } from '../../memory/memory-address.type';
import { IVoxelOctree } from '../../octree/voxel-octree.type';

export interface ISliceVoxelOctreeCallback {
  (
    voxelOctree: IVoxelOctree,
    x: number,
    y: number,
  ): IMemoryAddress;
}
