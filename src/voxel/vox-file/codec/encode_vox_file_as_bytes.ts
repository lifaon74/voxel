import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import {
  AllocFunction,
  create_alloc_function_for_bytes_buffer,
  create_bytes_buffer,
} from '@lifaon/math';
import { write_vox_file_content_in_bytes_buffer } from './write_vox_file_content_in_bytes_buffer';

export function encode_vox_file_as_bytes(
  chunk: MainVoxChunk,
  output: Uint8Array = create_bytes_buffer(2 ** 24),
): Uint8Array {
  const alloc: AllocFunction = create_alloc_function_for_bytes_buffer(output);
  write_vox_file_content_in_bytes_buffer(output, alloc, chunk);
  return output.subarray(0, alloc(0));
}
