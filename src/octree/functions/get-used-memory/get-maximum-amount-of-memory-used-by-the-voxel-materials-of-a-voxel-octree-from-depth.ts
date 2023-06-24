import { u32, u8 } from '@lifaon/number-types';
import { VOXEL_MATERIAL_BYTE_SIZE } from '../../../material/voxel-material-byte-size.constant';
import {
  get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped
} from './get-maximum-number-of-voxel-materials-used-by-a-voxel-octree-from-depth-clamped';

export function get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped(voxelOctreeDepth) * VOXEL_MATERIAL_BYTE_SIZE;
}
