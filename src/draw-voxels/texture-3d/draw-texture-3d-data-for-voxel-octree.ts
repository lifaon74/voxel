import { u8 } from '../../../../number-types/dist';
import { VOXEL_MATERIAL_BYTE_SIZE } from '../../material/voxel-material-byte-size.constant';
import { write_voxel_material_in_memory } from '../../material/write-voxel-material-in-memory';
import { IAllocFunction } from '../../memory/alloc-function.type';
import { IMemoryAddress } from '../../memory/memory-address.type';
import { IMemory } from '../../memory/memory.type';
import {
  write_voxel_octree_material_address_in_memory
} from '../../octree/functions/operations/write-voxel-octree-material-address-in-memory';
import { NO_MATERIAL } from '../../octree/special-addresses.constant';
import { ITexture3DData } from './texture-3d-data.type';

export function drawTexture3DDataForVoxelOctree(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
  alloc: IAllocFunction,
  texture: ITexture3DData,
): void {
  const x_size: number = texture[0].x;
  const y_size: number = texture[0].y;
  const z_size: number = texture[0].z;
  const data: Uint8Array = texture[1];
  let materialAddress: number;

  for (let x = 0; x < x_size; x++) {
    for (let y = 0; y < y_size; y++) {
      for (let z = 0; z < z_size; z++) {
        const i: number = (x + (y * x_size) + (z * x_size * y_size)) * 4;

        if (data[i + 3] === 0) {
          materialAddress = NO_MATERIAL;
        } else {
          materialAddress = alloc(VOXEL_MATERIAL_BYTE_SIZE);
          write_voxel_material_in_memory(memory, materialAddress, data[i], data[i + 1], data[i + 2]);
        }

        write_voxel_octree_material_address_in_memory(
          memory,
          voxelOctreeAddress,
          alloc,
          voxelOctreeDepth,
          x,
          y,
          z,
          materialAddress,
        );
      }
    }
  }
}
