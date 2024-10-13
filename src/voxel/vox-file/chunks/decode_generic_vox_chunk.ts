import {
  alloc_u32,
  AllocFunction,
  BytesBuffer,
  char_string,
  read_char_string_from_bytes_buffer,
  read_u32_be_from_bytes_buffer, read_uint8_array_from_bytes_buffer,
  u32
} from '@lifaon/math';

export interface IGenericVoxChunk {
  readonly id: string;
  readonly bytes: Uint8Array;
  readonly childrenBytes: Uint8Array;
}

export function decode_generic_vox_chunk(
  buffer: BytesBuffer,
  alloc: AllocFunction,
): IGenericVoxChunk {
  const id: char_string = read_char_string_from_bytes_buffer(buffer, alloc(4), 4);
  const byteLength: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));
  const childrenByteLength: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));
  const bytes: Uint8Array = read_uint8_array_from_bytes_buffer(buffer, alloc(byteLength), byteLength);
  const childrenBytes: Uint8Array = read_uint8_array_from_bytes_buffer(buffer, alloc(childrenByteLength), childrenByteLength);
  return {
    id,
    bytes,
    childrenBytes,
  };
}


