import { u8, vec3_create_u32, vec3_u32 } from '@lifaon/math';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';
import { read_voxel_material_address_of_voxel_octree_at_position } from '../../voxel/octree/functions/voxel-material/at-position/read_voxel_material_address_of_voxel_octree_at_position';

import { ISliceVoxelOctreeCallback } from './slice-voxel-octree-callback.type';

export function slice_octree_using_read_voxel(z: number): ISliceVoxelOctreeCallback {
  const POSITION: vec3_u32 = vec3_create_u32();
  POSITION[2] = z;

  return (
    memory: IMemory,
    voxelOctreeAddress: IMemoryAddress,
    voxelOctreeDepth: u8,
    x: number,
    y: number,
  ): IMemoryAddress => {
    POSITION[0] = x;
    POSITION[1] = y;

    return read_voxel_material_address_of_voxel_octree_at_position(
      memory,
      voxelOctreeAddress,
      voxelOctreeDepth,
      POSITION,
    );
  };
}
