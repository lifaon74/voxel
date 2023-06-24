import { IMemoryAddress } from '../../memory/memory-address.type';
import { IMemory } from '../../memory/memory.type';
import { get_voxel_octree_side_from_depth } from '../../octree/functions/misc/get-voxel-octree-side-from-depth';
import { NO_MATERIAL } from '../../octree/special-addresses.constant';
import { IVoxelOctree } from '../../octree/voxel-octree.type';
import { ISliceVoxelOctreeCallback } from './slice-voxel-octree-callback.type';

export function sliceVoxelOctree(
  voxelOctree: IVoxelOctree,
  getMaterial: ISliceVoxelOctreeCallback,
): ImageData {
  const side = get_voxel_octree_side_from_depth(voxelOctree.depth);
  const img: ImageData = new ImageData(side, side);
  const memory: IMemory = voxelOctree.pointer.memory;
  let i = 0;
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      const materialAddress: IMemoryAddress = getMaterial(voxelOctree, x, y);
      if (materialAddress === NO_MATERIAL) {
        i += 4;
      } else {
        img.data[i++] = memory[materialAddress];
        img.data[i++] = memory[materialAddress + 1];
        img.data[i++] = memory[materialAddress + 2];
        img.data[i++] = 255;
      }
    }
  }

  return img;
}

