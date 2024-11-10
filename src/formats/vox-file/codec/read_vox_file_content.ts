import { u32 } from '@lifaon/math';
import { MemoryReaderTrait } from '../../../memory/read/reader/traits/memory-reader.trait';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { read_unknown_vox_chunk } from '../chunks/unknown/read_unknown_vox_chunk';
import { UnknownVoxChunk } from '../chunks/unknown/unknown-vox-chunk';

export function read_vox_file_content(reader: MemoryReaderTrait): MainVoxChunk {
  if (
    reader.next_u8() !== 0x56 /* V */ ||
    reader.next_u8() !== 0x4f /* O */ ||
    reader.next_u8() !== 0x58 /* X */ ||
    reader.next_u8() !== 0x20 /* SPACE */
  ) {
    throw new Error('Not a VOX file');
  }

  const version: u32 = reader.next_u32_le();

  if (version !== 150) {
    throw new Error('Unsupported version');
  }

  const chunk: UnknownVoxChunk = read_unknown_vox_chunk(reader);

  if (chunk.type !== 'main') {
    throw new Error('Expected MAIN Chunk');
  }

  return chunk;
}
