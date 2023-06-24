import { u8 } from '@lifaon/number-types';
import { IAllocFunction } from '../memory/alloc-function.type';
import { IMemoryAddress } from '../memory/memory-address.type';
import { createMemoryPointer, IMemoryPointer } from '../memory/memory-pointer';
import { IMemory } from '../memory/memory.type';
import { VOXEL_MATERIAL_BYTE_SIZE } from './voxel-material-byte-size.constant';
import { write_voxel_material_in_memory } from './write-voxel-material-in-memory';


export function createVoxelMaterial(
  memory: IMemory,
  alloc: IAllocFunction,
  r: u8,
  g: u8,
  b: u8,
): IMemoryPointer {
  const voxelMaterialAddress: IMemoryAddress = alloc(VOXEL_MATERIAL_BYTE_SIZE);
  write_voxel_material_in_memory(memory, voxelMaterialAddress, r, g, b);
  return createMemoryPointer(
    memory,
    voxelMaterialAddress,
  );
}



