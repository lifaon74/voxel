import {
  alloc_u32,
  AllocFunction,
  BytesBuffer,
  create_alloc_function_for_bytes_buffer,
  read_u32_be_from_bytes_buffer,
  u32
} from '@lifaon/math';
import { IMainVoxChunk } from './chunks/main/main-vox-chunk.type';
import { decode_unknown_vox_chunk } from './chunks/unknown/decode_unknown_vox_chunk';
import { IUnknownVoxChunk } from './chunks/unknown/unknown-vox-chunk.type';

export function decode_vox_file(
  buffer: BytesBuffer,
  alloc: AllocFunction = create_alloc_function_for_bytes_buffer(buffer),
  checkRemainingSize: boolean = true
): IMainVoxChunk {
  if (
    (buffer[alloc(1)] !== 0x56 /* V */)
    || (buffer[alloc(1)] !== 0x4f /* O */)
    || (buffer[alloc(1)] !== 0x58 /* X */)
    || (buffer[alloc(1)] !== 0x20 /* SPACE */)
  ) {
    throw new Error('Not a VOX file');
  }

  const version: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));

  if (version !== 150) {
    throw new Error('Unsupported version');
  }

  const chunk: IUnknownVoxChunk = decode_unknown_vox_chunk(buffer, alloc);

  if (chunk.type !== 'main') {
    throw new Error('Expected MAIN Chunk');
  }

  if (checkRemainingSize && alloc(0) !== buffer.length) {
    throw new Error('Unexpected remaining bytes');
  }

  return chunk;
}
