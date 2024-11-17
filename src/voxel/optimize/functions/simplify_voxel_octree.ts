import { u32, u8 } from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../../memory/read/readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { MemoryWriteU32BETrait } from '../../../memory/write/writeonly/traits/methods/memory.write_u32_be.trait';
import { MemoryWriteU8Trait } from '../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';
import { get_voxel_octree_child_memory_address_from_voxel_octree_child_index } from '../../octree/voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';

export type SimplifyVoxelOctreeMemory = MemoryReadU8Trait &
  MemoryReadU32BETrait &
  MemoryWriteU8Trait &
  MemoryWriteU32BETrait;

export function simplify_voxel_octree(
  memory: SimplifyVoxelOctreeMemory,
  voxelOctreeAddress: u32,
): u32 /* commonVoxelMaterialAddress */ | null {
  let commonVoxelMaterialAddress: u32 | null | undefined;

  const mask: u8 = memory.read_u8(voxelOctreeAddress);
  let newMask: u8 = mask;

  for (let voxelOctreeChildIndex: u8 = 0; voxelOctreeChildIndex < 8; voxelOctreeChildIndex++) {
    const voxelOctreeChildAddressAddress: u32 =
      get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      );

    const voxelOctreeChildAddress: u32 = memory.read_u32_be(voxelOctreeChildAddressAddress);

    let childCommonVoxelMaterialAddress: u32 | null;

    // if true => is a `voxelOctreeAddress`, else it's a `voxelMaterialAddress`.
    if (mask & (1 << voxelOctreeChildIndex)) {
      childCommonVoxelMaterialAddress = simplify_voxel_octree(memory, voxelOctreeChildAddress);

      if (childCommonVoxelMaterialAddress !== null) {
        memory.write_u32_be(voxelOctreeChildAddressAddress, childCommonVoxelMaterialAddress);
        newMask &= 0xff ^ (1 << voxelOctreeChildIndex);
      }
    } else {
      childCommonVoxelMaterialAddress = voxelOctreeChildAddress;
    }

    if (commonVoxelMaterialAddress === undefined) {
      commonVoxelMaterialAddress = childCommonVoxelMaterialAddress;
    } else if (commonVoxelMaterialAddress !== childCommonVoxelMaterialAddress) {
      commonVoxelMaterialAddress = null;
    }
  }

  memory.write_u8(voxelOctreeAddress, newMask);

  return commonVoxelMaterialAddress!;
}
