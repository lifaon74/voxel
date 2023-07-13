import { u8 } from '@lifaon/math';
import { IMemory } from '../voxel/memory/memory.type';
import { IMemoryAddress } from '../voxel/memory/types/memory-address.type';
import { draw_image_data } from './draw_image_data';
import { ISliceVoxelOctreeCallback } from './slice/slice-voxel-octree-callback.type';
import { slice_voxel_octree } from './slice/slice_voxel_octree';

export function display_voxel_octree_slice(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
  getMaterial: ISliceVoxelOctreeCallback,
): HTMLCanvasElement {
  return draw_image_data(slice_voxel_octree(memory, voxelOctreeAddress, voxelOctreeDepth, getMaterial));
}
