import { u32 } from '@lifaon/math';
import { IXYZIVoxel } from './xyzi-voxel.type';
import { read_u32_be_from_uint8_array } from '../../../../functions/read_u32_be_from_uint8_array';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { IXYZIVoxChunk } from './xyzi-vox-chunk.type';

export function convert_generic_vox_chunk_to_xyzi_vox_chunk(
  chunk: IGenericVoxChunk,
): IXYZIVoxChunk {
  if (chunk.childrenBytes.length !== 0) {
    throw new Error(`XYZI chunk should not have children content`);
  }

  const voxels: IXYZIVoxel[] = [];

  const count: u32 = read_u32_be_from_uint8_array(chunk.bytes, 0);
  let index: u32 = 4;

  for (let i = 0; i < count; i++, index += 4) {
    voxels.push({
      x: chunk.bytes[index],
      y: chunk.bytes[index + 1],
      z: chunk.bytes[index + 2],
      i: chunk.bytes[index + 3],
    });
  }

  return {
    type: 'xyzi',
    voxels,
  };
}
