import { u8 } from '@lifaon/math';
import { IMemory } from '../../../memory/memory.type';
import { IMemoryAddress } from '../../../memory/types/memory-address.type';
import { IMemoryAllocFunction } from '../../../memory/types/memory-alloc-function.type';
import { SIZEOF_VOXEL_MATERIAL } from '../../constants/sizeof_voxel_material.constant';
import { write_voxel_material_in_memory } from '../write/write_voxel_material_in_memory';

export function allocate_and_write_voxel_material_in_memory(
  memory: IMemory,
  alloc: IMemoryAllocFunction,
  r: u8,
  g: u8,
  b: u8,
): IMemoryAddress {
  const voxelMaterialAddress: IMemoryAddress = alloc(SIZEOF_VOXEL_MATERIAL);
  write_voxel_material_in_memory(
    memory,
    voxelMaterialAddress,
    r,
    g,
    b,
  );
  return voxelMaterialAddress;
}
