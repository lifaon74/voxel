import {
  alloc_char_string,
  alloc_u32,
  alloc_uint8_array,
  AllocFunction,
  BytesBuffer,
  write_char_string_in_bytes_buffer,
  write_u32_be_in_bytes_buffer,
  write_uint8_array_in_bytes_buffer
} from '@lifaon/math';
import { IGenericVoxChunk } from './decode_generic_vox_chunk';

export function encode_generic_vox_chunk(
  buffer: BytesBuffer,
  alloc: AllocFunction,
  chunk: IGenericVoxChunk,
): void {
  write_char_string_in_bytes_buffer(buffer, alloc_char_string(alloc, chunk.id), chunk.id);
  write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.bytes.length);
  write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.childrenBytes.length);
  write_uint8_array_in_bytes_buffer(buffer, alloc_uint8_array(alloc, chunk.bytes), chunk.bytes);
  write_uint8_array_in_bytes_buffer(buffer, alloc_uint8_array(alloc, chunk.childrenBytes), chunk.childrenBytes);
}
