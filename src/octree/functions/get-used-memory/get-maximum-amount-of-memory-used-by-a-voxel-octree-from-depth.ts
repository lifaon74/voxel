import { u32, u8 } from '@lifaon/number-types';
import {
  get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth
} from './get-maximum-amount-of-memory-used-by-a-voxel-octree-excluding-its-voxel-materials-from-depth';
import {
  get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth
} from './get-maximum-amount-of-memory-used-by-the-voxel-materials-of-a-voxel-octree-from-depth';

export function get_maximum_amount_of_memory_used_by_a_voxel_octree_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth(voxelOctreeDepth)
    + get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth(voxelOctreeDepth);
}
