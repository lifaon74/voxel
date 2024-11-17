import { SIZEOF_U32, SIZEOF_U8, u32, u8 } from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../memory/read/readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { MemoryWriteU8Trait } from '../../memory/write/writeonly/traits/methods/memory.write_u8.trait';
import { new_voxel_material } from '../material/read-write/new_voxel_material';
import { alloc_voxel_octree } from '../octree/read-write/alloc_voxel_octree';
import { NewVoxelOctreeMemory } from '../octree/read-write/new_voxel_octree';
import { NO_MATERIAL } from '../octree/special-addresses.constant';

/*-------*/

/*-------*/

export type AppendVoxelOctreeInMemorySharedMemory = MemoryReadU8Trait & MemoryReadU32BETrait;
export type AppendVoxelOctreeInMemoryOutputMemory = NewVoxelOctreeMemory & MemoryWriteU8Trait;

export function append_voxel_octree_in_memory(
  // VOXEL_OCTREE
  memory: AppendVoxelOctreeInMemorySharedMemory,
  voxelOctreeAddress: u32,
  // OUTPUT_MEMORY
  outputMemory: AppendVoxelOctreeInMemoryOutputMemory,
  mappedAddresses: Map<u32 /* old */, u32 /* new */> = new Map<u32, u32>(),
): u32 /* newVoxelOctreeAddress */ {
  let newVoxelOctreeAddress: u32 | undefined = mappedAddresses.get(voxelOctreeAddress);

  if (newVoxelOctreeAddress === undefined) {
    newVoxelOctreeAddress = alloc_voxel_octree(outputMemory);
    mappedAddresses.set(voxelOctreeAddress, newVoxelOctreeAddress);

    // mask
    const mask: u8 = memory.read_u8(voxelOctreeAddress);
    outputMemory.write_u8(newVoxelOctreeAddress, mask);

    // children
    let voxelOctreeChildAddressAddress: u32 = voxelOctreeAddress + SIZEOF_U8;
    let newVoxelOctreeChildAddressAddress: u32 = newVoxelOctreeAddress + SIZEOF_U8;

    for (let voxelOctreeChildIndex: u8 = 0; voxelOctreeChildIndex < 8; voxelOctreeChildIndex++) {
      const voxelOctreeChildAddress: u32 = memory.read_u32_be(voxelOctreeChildAddressAddress);
      let newVoxelOctreeChildAddress: u32 | undefined;

      // if true => is a `voxelOctreeAddress`, else it's a `voxelMaterialAddress`.
      if (mask & (1 << voxelOctreeChildIndex)) {
        newVoxelOctreeChildAddress = append_voxel_octree_in_memory(
          memory,
          voxelOctreeChildAddress,
          outputMemory,
          mappedAddresses,
        );
      } else {
        if (voxelOctreeChildAddress === NO_MATERIAL) {
          newVoxelOctreeChildAddress = NO_MATERIAL;
        } else {
          newVoxelOctreeChildAddress = mappedAddresses.get(voxelOctreeChildAddress);

          if (newVoxelOctreeChildAddress === undefined) {
            newVoxelOctreeChildAddress = new_voxel_material(
              outputMemory,
              memory.read_u8(voxelOctreeChildAddress),
              memory.read_u8(voxelOctreeChildAddress + 1),
              memory.read_u8(voxelOctreeChildAddress + 2),
            );
            mappedAddresses.set(voxelOctreeChildAddress, newVoxelOctreeChildAddress);
          }
        }
      }

      outputMemory.write_u32_be(newVoxelOctreeChildAddressAddress, newVoxelOctreeChildAddress);

      voxelOctreeChildAddressAddress += SIZEOF_U32;
      newVoxelOctreeChildAddressAddress += SIZEOF_U32;
    }
  }

  return newVoxelOctreeAddress;
}

// export function def(
//   memory: DeduplicateVoxelOctreesMaterialsMemory,
//   voxelOctrees: readonly VoxelOctreeInSharedMemory[],
//   outputMemory: DeduplicateVoxelOctreesMaterialsMemory,
// ): void {}
