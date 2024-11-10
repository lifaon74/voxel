import { u32, u8 } from '@lifaon/math';
import { MemoryReadU8Trait } from '../../../../memory/read/readonly/traits/methods/memory.read_u8.trait';

/**
 * Returns true if the `voxelOctreeChild` located at `voxelOctreeChildIndex`, is a `voxelOctreeAddress`, else it's a `voxelMaterialAddress`.
 */
export function is_voxel_octree_child_index_a_voxel_octree_address(
  memory: MemoryReadU8Trait,
  voxelOctreeAddress: u32,
  voxelOctreeChildIndex: u8,
): boolean {
  return ((memory.read_u8(voxelOctreeAddress) >> voxelOctreeChildIndex) &
    0x1) as unknown as boolean;
}
