import { read_u8_from_memory } from '../../../../memory/functions/read-write/u8/read_u8_from_memory';
import { IMemory } from '../../../../memory/memory.type';
import { IMemoryAddress } from '../../../../memory/types/memory-address.type';

/**
 * Returns true if the `voxelOctreeChild` located at `voxelOctreeChildIndex`, is a `voxelOctreeAddress`, else it's a `voxelMaterialAddress`.
 */
export function is_voxel_octree_child_index_a_voxel_octree_address(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeChildIndex: IMemoryAddress,
): boolean {
  return ((read_u8_from_memory(memory, voxelOctreeAddress) >> voxelOctreeChildIndex) & 0x1) as unknown as boolean;
}
