import { AllocFunction, BytesBuffer } from '@lifaon/math';
import { decode_generic_vox_chunk } from '../decode_generic_vox_chunk';
import { convert_generic_chunk_to_unknown_vox_chunk } from './convert_generic_chunk_to_unknown_vox_chunk';

import { IUnknownVoxChunk } from './unknown-vox-chunk.type';

export function decode_unknown_vox_chunk(
  buffer: BytesBuffer,
  alloc: AllocFunction
): IUnknownVoxChunk {
  return convert_generic_chunk_to_unknown_vox_chunk(decode_generic_vox_chunk(buffer, alloc));
}


