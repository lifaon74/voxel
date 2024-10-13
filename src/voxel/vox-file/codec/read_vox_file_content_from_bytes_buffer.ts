import {
  alloc_u32,
  AllocFunction,
  BytesBuffer,
  read_u32_be_from_bytes_buffer,
  u32,
} from '@lifaon/math';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { read_unknown_vox_chunk_from_bytes_buffer } from '../chunks/unknown/read_unknown_vox_chunk_from_bytes_buffer';
import { UnknownVoxChunk } from '../chunks/unknown/unknown-vox-chunk';

export function read_vox_file_content_from_bytes_buffer(
  buffer: BytesBuffer,
  alloc: AllocFunction,
): MainVoxChunk {
  if (
    buffer[alloc(1)] !== 0x56 /* V */ ||
    buffer[alloc(1)] !== 0x4f /* O */ ||
    buffer[alloc(1)] !== 0x58 /* X */ ||
    buffer[alloc(1)] !== 0x20 /* SPACE */
  ) {
    throw new Error('Not a VOX file');
  }

  const version: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));

  if (version !== 150) {
    throw new Error('Unsupported version');
  }

  const chunk: UnknownVoxChunk = read_unknown_vox_chunk_from_bytes_buffer(buffer, alloc);

  if (chunk.type !== 'main') {
    throw new Error('Expected MAIN Chunk');
  }

  return chunk;
}
