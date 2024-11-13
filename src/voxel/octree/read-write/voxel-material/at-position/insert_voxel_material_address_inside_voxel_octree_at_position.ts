import { u32, u8, vec3, vec3_u32 } from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../../../../memory/read/readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { MemoryAllocTrait } from '../../../../../memory/shared/dynamic/traits/methods/memory.alloc.trait';
import { MemoryWriteU32BETrait } from '../../../../../memory/write/writeonly/traits/methods/memory.write_u32_be.trait';
import { MemoryWriteU8Trait } from '../../../../../memory/write/writeonly/traits/methods/memory.write_u8.trait';
import { get_voxel_octree_child_index_from_position_3d } from '../../../voxel-octree-child/index/get_voxel_octree_child_index_from_position_3d';
import { get_voxel_octree_child_memory_address_from_voxel_octree_child_index } from '../../../voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../../../voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';
import { set_voxel_octree_child_as_voxel_octree_using_index } from '../../../voxel-octree-child/type/set_voxel_octree_child_as_voxel_octree_using_index';
import { new_voxel_octree } from '../../new_voxel_octree';

export type InsertVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory = MemoryReadU8Trait &
  MemoryReadU32BETrait &
  MemoryAllocTrait &
  MemoryWriteU8Trait &
  MemoryWriteU32BETrait;

export function insert_voxel_material_address_inside_voxel_octree_at_position(
  memory: InsertVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory,
  voxelOctreeAddress: u32,
  voxelOctreeDepth: u8,
  position: vec3_u32,
  voxelMaterialAddress: u32,
): void {
  // insert <voxelMaterialAddress> at proper place
  while (voxelOctreeDepth >= 0) {
    const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_position_3d(
      voxelOctreeDepth,
      position,
    );

    const voxelOctreeChildAddressAddress: u32 =
      get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
        voxelOctreeAddress,
        voxelOctreeChildIndex,
      );

    if (voxelOctreeDepth === 0) {
      // for depth === 0 mask should be equals to <voxelMaterialAddress> by default
      memory.write_u32_be(voxelOctreeChildAddressAddress, voxelMaterialAddress);
      break;
    } else {
      const voxelOctreeChildAddress: u32 = memory.read_u32_be(voxelOctreeChildAddressAddress);

      if (
        is_voxel_octree_child_index_a_voxel_octree_address(
          memory,
          voxelOctreeAddress,
          voxelOctreeChildIndex,
        )
      ) {
        // is <voxelOctreeAddress>
        voxelOctreeAddress = voxelOctreeChildAddress;
      } else {
        // is <voxelMaterialAddress>
        if (voxelOctreeChildAddress === voxelMaterialAddress) {
          // same values
          break; // here we are not at the deepest lvl, <voxelMaterialAddress>es are the same and the <voxelOctree> should already be optimized => touch nothing
        } else {
          // <voxelMaterialAddress>es are different => must split current <voxelMaterialAddress> into another <voxelOctree>
          // allocate memory for a new <voxelOctree>, and initializes the new <voxelOctree> with <voxelMaterialAddress>
          const newVoxelOctreeAddress: u32 = new_voxel_octree(memory, voxelOctreeChildAddress);

          // update mask to <voxelOctreeAddress> type
          set_voxel_octree_child_as_voxel_octree_using_index(
            memory,
            voxelOctreeAddress,
            voxelOctreeChildIndex,
          );

          // replace the old <voxelMaterialAddress> with the new <voxelOctreeAddress>
          memory.write_u32_be(voxelOctreeChildAddressAddress, newVoxelOctreeAddress);

          voxelOctreeAddress = newVoxelOctreeAddress;
        }
      }
    }

    voxelOctreeDepth--;
  }
}
