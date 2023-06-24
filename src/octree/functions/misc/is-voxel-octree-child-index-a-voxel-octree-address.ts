import { IMemoryAddress } from '../../../memory/memory-address.type';
import { IMemory } from '../../../memory/memory.type';

export function is_voxel_octree_child_index_a_voxel_octree_address(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeChildIndex: IMemoryAddress,
): boolean {
  return ((memory[voxelOctreeAddress] >> voxelOctreeChildIndex) & 0x1) as unknown as boolean;
}
