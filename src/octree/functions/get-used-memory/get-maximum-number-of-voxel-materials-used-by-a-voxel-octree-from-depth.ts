import { u32, u8 } from '@lifaon/number-types';
import { get_voxel_octree_side_from_depth } from '../misc/get-voxel-octree-side-from-depth';

export function get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return get_voxel_octree_side_from_depth(voxelOctreeDepth) ** 3;
}
