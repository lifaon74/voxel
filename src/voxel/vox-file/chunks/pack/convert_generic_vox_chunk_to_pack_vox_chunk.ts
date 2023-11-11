import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { IPackVoxChunk } from './pack-vox-chunk.type';
import { read_u32_be_from_uint8_array } from '../../../../functions/read_u32_be_from_uint8_array';

export function convert_generic_vox_chunk_to_pack_vox_chunk(
  chunk: IGenericVoxChunk,
): IPackVoxChunk {
  if (chunk.childrenBytes.length !== 0) {
    throw new Error(`SIZE chunk should not have children content`);
  }

  return {
    type: 'pack',
    numberOfModels: read_u32_be_from_uint8_array(chunk.bytes, 0),
  };
}
