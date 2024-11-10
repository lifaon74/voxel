import { u32, u8 } from '@lifaon/math';
import { SIZEOF_VOXEL_OCTREE } from '../read-write/sizeof_voxel_octree.constant';

/**
 * Returns the maximum amount of memory that a `voxelOctree` may use, if we don't consider the size of its materials.
 */
export function get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth(
  voxelOctreeDepth: u8,
): u32 {
  return voxelOctreeDepth === 0 ? SIZEOF_VOXEL_OCTREE : (
      SIZEOF_VOXEL_OCTREE +
        8 *
          get_maximum_amount_of_memory_used_by_a_voxel_octree_excluding_its_voxel_materials_from_depth(
            voxelOctreeDepth - 1,
          )
    );
}
