import { IMemory } from '../../../memory/memory.type';
import { IMemoryAddress } from '../../../memory/types/memory-address.type';
import { IMemoryAllocFunction } from '../../../memory/types/memory-alloc-function.type';
import { SIZEOF_VOXEL_OCTREE } from '../../constants/sizeof_voxel_octree.constant';
import { write_voxel_octree_in_memory } from '../write/write_voxel_octree_in_memory';

export function allocate_and_write_voxel_octree_in_memory(
  memory: IMemory,
  alloc: IMemoryAllocFunction,
  voxelMaterialAddress: IMemoryAddress,
): IMemoryAddress {
  const voxelOctreeAddress: IMemoryAddress = alloc(SIZEOF_VOXEL_OCTREE);
  write_voxel_octree_in_memory(
    memory,
    voxelOctreeAddress,
    voxelMaterialAddress,
  );
  return voxelOctreeAddress;
}

