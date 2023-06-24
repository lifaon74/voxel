import { IMemoryAddress } from '../../../memory/memory-address.type';
import { IMemory } from '../../../memory/memory.type';

export function set_voxel_octree_child_as_voxel_octree_using_index(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeChildIndex: IMemoryAddress,
): void {
  memory[voxelOctreeAddress] |= (0x1 << voxelOctreeChildIndex);
}
