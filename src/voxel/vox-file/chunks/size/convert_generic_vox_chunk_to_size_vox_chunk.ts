import { read_u32_be_from_uint8_array } from '../../../../functions/read_u32_be_from_uint8_array';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { ISizeVoxChunk } from './size-vox-chunk.type';

export function convert_generic_vox_chunk_to_size_vox_chunk(
  chunk: IGenericVoxChunk,
): ISizeVoxChunk {
  if (chunk.childrenBytes.length !== 0) {
    throw new Error(`SIZE chunk should not have children content`);
  }

  return {
    type: 'size',
    x: read_u32_be_from_uint8_array(chunk.bytes, 0),
    y: read_u32_be_from_uint8_array(chunk.bytes, 4),
    z: read_u32_be_from_uint8_array(chunk.bytes, 8),
  };
}
