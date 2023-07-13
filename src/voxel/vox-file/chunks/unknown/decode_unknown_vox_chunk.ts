import { decode_generic_vox_chunk } from '../decode_generic_vox_chunk';
import { convert_generic_chunk_to_unknown_vox_chunk } from './convert_generic_chunk_to_unknown_vox_chunk';

import { IUnknownVoxChunk } from './unknown-vox-chunk.type';

export function decode_unknown_vox_chunk(
  bytes: Uint8Array,
): [chunk: IUnknownVoxChunk, remaining: Uint8Array] {
  const [chunk, remaining] = decode_generic_vox_chunk(bytes);
  return [
    convert_generic_chunk_to_unknown_vox_chunk(chunk),
    remaining,
  ];
}
