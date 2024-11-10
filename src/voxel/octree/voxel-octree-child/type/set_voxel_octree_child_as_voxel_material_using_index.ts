import { u32, u8 } from '@lifaon/math';
import { MemoryReadU8Trait } from '../../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { MemoryWriteU8Trait } from '../../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';

/**
 * Update the mask of the `voxelOctreeChild` to be considered as a `voxelMaterial`.
 */
export function set_voxel_octree_child_as_voxel_material_using_index(
  memory: MemoryReadU8Trait & MemoryWriteU8Trait,
  voxelOctreeAddress: u32,
  voxelOctreeChildIndex: u8,
): void {
  memory.write_u8(
    voxelOctreeAddress,
    memory.read_u8(voxelOctreeAddress) & ~(0x1 << voxelOctreeChildIndex),
  );
}
