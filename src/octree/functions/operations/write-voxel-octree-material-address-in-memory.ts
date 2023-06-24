import { u32, u8 } from '@lifaon/number-types';
import { IAllocFunction } from '../../../memory/alloc-function.type';
import { IMemoryAddress } from '../../../memory/memory-address.type';
import { IMemory } from '../../../memory/memory.type';
import { read_u32_from_memory } from '../../../memory/operations/read-u32-from-memory';
import { write_u32_in_memory } from '../../../memory/operations/write-u32-in-memory';
import { VOXEL_OCTREE_BYTE_SIZE } from '../../voxel-octree-byte-size.constant';
import { write_voxel_octree_in_memory } from '../../write-voxel-octree-in-memory';
import { get_voxel_octree_child_index_from_3d_position } from '../misc/get-voxel-octree-child-index-from-3d-position';
import {
  get_voxel_octree_child_memory_address_from_voxel_octree_child_index,
} from '../misc/get-voxel-octree-child-memory-address-from-voxel-octree-child-index';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../misc/is-voxel-octree-child-index-a-voxel-octree-address';
import { set_voxel_octree_child_as_voxel_octree_using_index } from '../misc/set-voxel-octree-child-as-voxel-octree-using-index';

export function write_voxel_octree_material_address_in_memory(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  alloc: IAllocFunction,
  voxelOctreeDepth: u8,
  x: u32,
  y: u32,
  z: u32,
  voxelMaterialAddress: IMemoryAddress,
): void {
  // insert <voxelMaterialAddress> at proper place
  while (voxelOctreeDepth >= 0) {
    const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_3d_position(voxelOctreeDepth, x, y, z);
    const voxelOctreeChildAddressAddress: IMemoryAddress = get_voxel_octree_child_memory_address_from_voxel_octree_child_index(voxelOctreeAddress, voxelOctreeChildIndex);

    if (voxelOctreeDepth === 0) {
      // for depth === 0 mask should be equals to <voxelMaterialAddress> by default
      write_u32_in_memory(memory, voxelOctreeChildAddressAddress, voxelMaterialAddress);
      break;
    } else {
      const voxelOctreeChildAddress: IMemoryAddress = read_u32_from_memory(memory, voxelOctreeChildAddressAddress);
      if (is_voxel_octree_child_index_a_voxel_octree_address(memory, voxelOctreeAddress, voxelOctreeChildIndex)) { // is <voxelOctreeAddress>
        voxelOctreeAddress = voxelOctreeChildAddress;
      } else { // is <voxelMaterialAddress>
        if (voxelOctreeChildAddress === voxelMaterialAddress) { // same values
          break; // here we are not at the deepest lvl, <voxelMaterialAddress>es are the same and the <voxelOctree> should already be optimized => touch nothing
        } else { // <voxelMaterialAddress>es are different => must split current <voxelMaterialAddress> into another <voxelOctree>
          const newVoxelOctreeAddress: IMemoryAddress = alloc(VOXEL_OCTREE_BYTE_SIZE); // allocates memory for a new <voxelOctree>
          write_voxel_octree_in_memory(memory, newVoxelOctreeAddress, voxelOctreeChildAddress); // initialize the new <voxelOctree> with <voxelMaterialAddress>

          // update mask to <voxelOctreeAddress> type
          set_voxel_octree_child_as_voxel_octree_using_index(memory, voxelOctreeAddress, voxelOctreeChildIndex);

          // replace the old <voxelMaterialAddress> with the new <voxelOctreeAddress>
          write_u32_in_memory(memory, voxelOctreeChildAddressAddress, newVoxelOctreeAddress);

          voxelOctreeAddress = newVoxelOctreeAddress;
        }
      }
    }

    voxelOctreeDepth--;
  }
}







