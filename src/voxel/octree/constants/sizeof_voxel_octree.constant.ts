import { SIZEOF_U32 } from '../../memory/functions/read-write/u32/sizeof_u32.constant';
import { SIZEOF_U8 } from '../../memory/functions/read-write/u8/sizeof_u8.constant';

export const SIZEOF_VOXEL_OCTREE = SIZEOF_U8 + SIZEOF_U32 * 8;
