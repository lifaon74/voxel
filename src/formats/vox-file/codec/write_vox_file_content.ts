import { MemoryWriter } from '../../../memory/write/writer/memory-writer';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';

import { write_unknown_vox_chunk } from '../chunks/unknown/write_unknown_vox_chunk';

export function write_vox_file_content(writer: MemoryWriter, chunk: MainVoxChunk): void {
  writer.next_u8(0x56); /* V */
  writer.next_u8(0x4f); /* O */
  writer.next_u8(0x58); /* X */
  writer.next_u8(0x20); /* SPACE */

  writer.next_u32_le(150);

  write_unknown_vox_chunk(writer, chunk);
}
