import { read_u8_from_memory } from '../../../../memory/functions/read-write/u8/read_u8_from_memory';
import { write_u8_in_memory } from '../../../../memory/functions/read-write/u8/write_u8_in_memory';
import { IMemory } from '../../../../memory/memory.type';
import { IMemoryAddress } from '../../../../memory/types/memory-address.type';

/**
 * Update the mask of the `voxelOctreeChild` to be considered as a `voxelOctree`.
 */
export function set_voxel_octree_child_as_voxel_octree_using_index(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeChildIndex: IMemoryAddress,
): void {
  write_u8_in_memory(
    memory,
    voxelOctreeAddress,
    read_u8_from_memory(memory, voxelOctreeAddress) | (0x1 << voxelOctreeChildIndex),
  );
}
