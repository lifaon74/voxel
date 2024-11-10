import { MemoryReader } from '../../../memory/read/reader/memory-reader';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { read_vox_file_content } from './read_vox_file_content';

export function decode_vox_file_from_bytes(bytes: Uint8Array): MainVoxChunk {
  const reader = new MemoryReader(bytes);
  const chunk: MainVoxChunk = read_vox_file_content(reader);
  if (reader.cursor !== bytes.length) {
    throw new Error("Vox file content does not match the provided bytes' size.");
  }
  return chunk;
}
