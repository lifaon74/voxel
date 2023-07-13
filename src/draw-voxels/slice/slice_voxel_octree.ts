import { u32, u8 } from '@lifaon/math';
import { read_u8_from_memory } from '../../voxel/memory/functions/read-write/u8/read_u8_from_memory';
import { IMemory } from '../../voxel/memory/memory.type';
import { IMemoryAddress } from '../../voxel/memory/types/memory-address.type';
import { voxel_octree_depth_to_side } from '../../voxel/octree/functions/depth-side/voxel_octree_depth_to_side';
import { NO_MATERIAL } from '../../voxel/octree/special-addresses.constant';
import { ISliceVoxelOctreeCallback } from './slice-voxel-octree-callback.type';

export function slice_voxel_octree(
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
  getMaterial: ISliceVoxelOctreeCallback,
): ImageData {
  const side: u32 = voxel_octree_depth_to_side(voxelOctreeDepth);
  const img: ImageData = new ImageData(side, side);

  let i: u32 = 0;
  for (let y: u32 = 0; y < side; y++) {
    for (let x: u32 = 0; x < side; x++) {
      const materialAddress: IMemoryAddress = getMaterial(memory, voxelOctreeAddress, voxelOctreeDepth, x, y);
      if (materialAddress === NO_MATERIAL) {
        i += 4;
      } else {
        img.data[i++] = read_u8_from_memory(memory, materialAddress);
        img.data[i++] = read_u8_from_memory(memory, materialAddress + 1);
        img.data[i++] = read_u8_from_memory(memory, materialAddress + 2);
        img.data[i++] = 255;
      }
    }
  }

  return img;
}

