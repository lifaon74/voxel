import { u32, u8 } from '@lifaon/math';
import { SIZEOF_VOXEL_MATERIAL } from '../../../material/constants/sizeof_voxel_material.constant';
import {
  get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped
} from './get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped';

/**
 * Returns the maximum amount of memory that the `voxelMaterials` of `voxelOctree` may use.
 */
export function get_maximum_amount_of_memory_used_by_the_voxel_materials_of_a_voxel_octree_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return (
    get_maximum_number_of_voxel_materials_used_by_a_voxel_octree_from_depth_clamped(
      voxelOctreeDepth,
    ) * SIZEOF_VOXEL_MATERIAL
  );
}
