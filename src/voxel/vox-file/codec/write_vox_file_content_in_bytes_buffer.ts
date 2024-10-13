import { alloc_u32, AllocFunction, BytesBuffer, write_u32_be_in_bytes_buffer } from '@lifaon/math';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';

import { write_unknown_vox_chunk_in_bytes_buffer } from '../chunks/unknown/write_unknown_vox_chunk_in_bytes_buffer';

export function write_vox_file_content_in_bytes_buffer(
  buffer: BytesBuffer,
  alloc: AllocFunction,
  chunk: MainVoxChunk,
): void {
  buffer[alloc(1)] = 0x56 /* V */;
  buffer[alloc(1)] = 0x4f /* O */;
  buffer[alloc(1)] = 0x58 /* X */;
  buffer[alloc(1)] = 0x20 /* SPACE */;

  write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), 150);

  write_unknown_vox_chunk_in_bytes_buffer(buffer, alloc, chunk);
}
