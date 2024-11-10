import { SIZEOF_U32, SIZEOF_U8 } from '@lifaon/math';

export const SIZEOF_VOXEL_OCTREE = SIZEOF_U8 + SIZEOF_U32 * 8; // [mask (u8), ...addresses (u32) x8] - mask 0b[is material (0/1) x8]
