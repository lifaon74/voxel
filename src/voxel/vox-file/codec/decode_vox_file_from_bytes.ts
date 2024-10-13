import { AllocFunction, create_alloc_function_for_bytes_buffer } from '@lifaon/math';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { read_vox_file_content_from_bytes_buffer } from './read_vox_file_content_from_bytes_buffer';

export function decode_vox_file_from_bytes(bytes: Uint8Array): MainVoxChunk {
  const alloc: AllocFunction = create_alloc_function_for_bytes_buffer(bytes);
  const chunk: MainVoxChunk = read_vox_file_content_from_bytes_buffer(bytes, alloc);
  if (alloc(0) !== bytes.length) {
    throw new Error("Vox file content does not match the provided bytes' size.");
  }
  return chunk;
}
