import { u8 } from '../../../../number-types/dist';
import { SIZEOF_VOXEL_MATERIAL } from '../../voxel/material/constants/sizeof_voxel_material.constant';
import { write_voxel_material_in_memory } from '../../voxel/material/functions/write/write_voxel_material_in_memory';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';
import { allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position } from '../../voxel/octree/functions/voxel-material/at-position/allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position';
import { NO_MATERIAL } from '../../voxel/octree/special-addresses.constant';
import { ITexture3DData } from './texture-3d-data.type';

export function drawTexture3DDataForVoxelOctree(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
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
        const i: number = (x + y * x_size + z * x_size * y_size) * 4;

        if (data[i + 3] === 0) {
          materialAddress = NO_MATERIAL;
        } else {
          materialAddress = memory.alloc(SIZEOF_VOXEL_MATERIAL);
          write_voxel_material_in_memory(
            memory.memory,
            materialAddress,
            data[i],
            data[i + 1],
            data[i + 2],
          );
        }

        allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
          memory.memory,
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
