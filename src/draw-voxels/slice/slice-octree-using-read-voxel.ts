import { IMemoryAddress } from '../../memory/memory-address.type';
import {
  read_voxel_material_address_of_voxel_octree_at_position
} from '../../octree/functions/operations/read-voxel-material-address-of-voxel-octree-at-position';
import { IVoxelOctree } from '../../octree/voxel-octree.type';
import { ISliceVoxelOctreeCallback } from './slice-voxel-octree-callback.type';

export function sliceOctreeUsingReadVoxel(
  z: number,
): ISliceVoxelOctreeCallback {
  return (
    voxelOctree: IVoxelOctree,
    x: number,
    y: number,
  ): IMemoryAddress => {
    return read_voxel_material_address_of_voxel_octree_at_position(
      voxelOctree.pointer.memory,
      voxelOctree.pointer.address,
      voxelOctree.depth,
      x,
      y,
      z,
    );
  };
}
