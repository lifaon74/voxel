import { U32_BYTE_SIZE } from '../../../memory/operations/u32-byte-size.constant';
import {
  get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth
} from './get-maximum-number-of-voxel-materials-used-by-a-voxel-octree-from-depth';
import { u32, u8 } from '@lifaon/number-types';

export function get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped(
  voxelOctreeDepth: u8,
): u32 {
  return Math.min(get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth(voxelOctreeDepth), (2 ** 8) ** U32_BYTE_SIZE);
}
