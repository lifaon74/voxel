import { u32, u8, vec3_u32 } from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../../../../memory/read/readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { get_voxel_octree_child_index_from_position_3d } from '../../../voxel-octree-child/index/get_voxel_octree_child_index_from_position_3d';
import { get_voxel_octree_child_memory_address_from_voxel_octree_child_index } from '../../../voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../../../voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';

export type ReadVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory = MemoryReadU8Trait &
  MemoryReadU32BETrait;

/**
 * Reads the `voxelMaterialAddress` located at a specific position of a `voxelOctree`.
 */
export function read_voxel_material_address_inside_voxel_octree_at_position(
  memory: ReadVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory,
  voxelOctreeAddress: u32,
  voxelOctreeDepth: u8,
  position: vec3_u32,
): u32 {
  while (voxelOctreeDepth >= 0) {
    const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_position_3d(
      voxelOctreeDepth,
      position,
    );

    const voxelOctreeChildAddress: u32 = memory.read_u32_be(
      get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      ),
    );

    if (
      is_voxel_octree_child_index_a_voxel_octree_address(
        memory,
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      )
    ) {
      voxelOctreeAddress = voxelOctreeChildAddress;
      voxelOctreeDepth--;
    } else {
      return voxelOctreeChildAddress;
    }
  }
  throw new Error('Invalid coords.');
}
