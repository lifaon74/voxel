import { IVoxelOctree } from '../octree/voxel-octree.type';
import { drawImageData } from './draw-image-data';
import { sliceVoxelOctree } from './slice/slice-voxel-octree';
import { ISliceVoxelOctreeCallback } from './slice/slice-voxel-octree-callback.type';

export function displayVoxelOctreeSlice(
  voxelOctree: IVoxelOctree,
  getMaterial: ISliceVoxelOctreeCallback,
): HTMLCanvasElement {
  return drawImageData(sliceVoxelOctree(voxelOctree, getMaterial));
}
