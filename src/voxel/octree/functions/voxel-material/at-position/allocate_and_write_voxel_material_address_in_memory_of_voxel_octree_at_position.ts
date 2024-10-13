import { u8, vec3_u32 } from '@lifaon/math';
import { read_u32_be_from_memory } from '../../../../memory/functions/read-write/u32/read_u32_be_from_memory';
import { write_u32_be_in_memory } from '../../../../memory/functions/read-write/u32/write_u32_be_in_memory';
import { IMemory } from '../../../../memory/memory.type';
import { IMemoryAddress } from '../../../../memory/types/memory-address.type';
import { IMemoryAllocFunction } from '../../../../memory/types/memory-alloc-function.type';
import { IVoxelOctreePosition3d } from '../../../types/voxel-octree-position-3d.type';
import { allocate_and_write_voxel_octree_in_memory } from '../../allocate/allocate_and_write_voxel_octree_in_memory';
import {
  get_voxel_octree_child_index_from_position_3d,
} from '../../voxel-octree-child/index/get_voxel_octree_child_index_from_position_3d';
import {
  get_voxel_octree_child_memory_address_from_voxel_octree_child_index,
} from '../../voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';
import {
  is_voxel_octree_child_index_a_voxel_octree_address,
} from '../../voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';
import {
  set_voxel_octree_child_as_voxel_octree_using_index,
} from '../../voxel-octree-child/type/set_voxel_octree_child_as_voxel_octree_using_index';

export function allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
  memory: IMemory,
  alloc: IMemoryAllocFunction,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
  position: IVoxelOctreePosition3d,
  voxelMaterialAddress: IMemoryAddress,
): void {
  // insert <voxelMaterialAddress> at proper place
  while (voxelOctreeDepth >= 0) {
    const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_position_3d(
      voxelOctreeDepth,
      position,
    );

    const voxelOctreeChildAddressAddress: IMemoryAddress = get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
      voxelOctreeAddress,
      voxelOctreeChildIndex,
    );

    if (voxelOctreeDepth === 0) {
      // for depth === 0 mask should be equals to <voxelMaterialAddress> by default
      write_u32_be_in_memory(
        memory,
        voxelOctreeChildAddressAddress,
        voxelMaterialAddress,
      );
      break;
    } else {
      const voxelOctreeChildAddress: IMemoryAddress = read_u32_be_from_memory(
        memory,
        voxelOctreeChildAddressAddress,
      );

      if (
        is_voxel_octree_child_index_a_voxel_octree_address(
          memory,
          voxelOctreeAddress,
          voxelOctreeChildIndex,
        )
      ) { // is <voxelOctreeAddress>
        voxelOctreeAddress = voxelOctreeChildAddress;
      } else { // is <voxelMaterialAddress>
        if (voxelOctreeChildAddress === voxelMaterialAddress) { // same values
          break; // here we are not at the deepest lvl, <voxelMaterialAddress>es are the same and the <voxelOctree> should already be optimized => touch nothing
        } else { // <voxelMaterialAddress>es are different => must split current <voxelMaterialAddress> into another <voxelOctree>
          // allocate memory for a new <voxelOctree>, and initializes the new <voxelOctree> with <voxelMaterialAddress>
          const newVoxelOctreeAddress: IMemoryAddress = allocate_and_write_voxel_octree_in_memory(
            memory,
            alloc,
            voxelOctreeChildAddress,
          );

          // update mask to <voxelOctreeAddress> type
          set_voxel_octree_child_as_voxel_octree_using_index(
            memory,
            voxelOctreeAddress,
            voxelOctreeChildIndex,
          );

          // replace the old <voxelMaterialAddress> with the new <voxelOctreeAddress>
          write_u32_be_in_memory(
            memory,
            voxelOctreeChildAddressAddress,
            newVoxelOctreeAddress,
          );

          voxelOctreeAddress = newVoxelOctreeAddress;
        }
      }
    }

    voxelOctreeDepth--;
  }
}



