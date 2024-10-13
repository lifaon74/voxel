import { AllocFunction, BytesBuffer } from '@lifaon/math';
import { encode_generic_vox_chunk } from '../encode_generic_vox_chunk';
import { convert_unknown_vox_chunk_to_generic_chunk } from './convert_generic_chunk_to_unknown_vox_chunk';
import { IUnknownVoxChunk } from './unknown-vox-chunk.type';

export function encode_unknown_vox_chunk(
  buffer: BytesBuffer,
  alloc: AllocFunction,
  chunk: IUnknownVoxChunk,
): void {
  return encode_generic_vox_chunk(buffer, alloc, convert_unknown_vox_chunk_to_generic_chunk(chunk));
}
