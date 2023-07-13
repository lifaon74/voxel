import { u32, u8 } from '@lifaon/math';

/**
 * Returns the "depth" of a `voxelOctree`.
 * A `voxelOctree` with a side of 2 has a depth of 0.
 */
export function voxel_octree_side_to_depth(
  voxelOctreeSide: u32,
): u8 {
  let depth: number = -1;
  while ((voxelOctreeSide & 0x1) === 0) {
    voxelOctreeSide >>= 1;
    depth++;
  }

  if (voxelOctreeSide !== 0x1) {
    throw new Error(`Invalid side ${ voxelOctreeSide }: must be a power of 2`);
  }

  if (depth < 0) {
    throw new Error(`Invalid side ${ voxelOctreeSide }: must be greater than 2`);
  }

  return depth;
}
