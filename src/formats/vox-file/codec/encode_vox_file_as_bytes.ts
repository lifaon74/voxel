import { MemoryWriter } from '../../../memory/write/writer/memory-writer';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { write_vox_file_content } from './write_vox_file_content';

export function encode_vox_file_as_bytes(chunk: MainVoxChunk): Uint8Array {
  const writer: MemoryWriter = new MemoryWriter(2 ** 24);
  write_vox_file_content(writer, chunk);
  return writer.bytes.subarray(0, writer.cursor);
}
