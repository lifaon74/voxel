import { read_u32_be_from_uint8_array } from '../../functions/read_u32_be_from_uint8_array';
import { IMainVoxChunk } from './chunks/main/main-vox-chunk.type';
import { decode_unknown_vox_chunk } from './chunks/unknown/decode_unknown_vox_chunk';

export function decode_vox_file_bytes(
  bytes: Uint8Array,
): IMainVoxChunk {
  if (

    (bytes[0] !== 0x56 /* V */)
    || (bytes[1] !== 0x4f /* O */)
    || (bytes[2] !== 0x58 /* X */)
    || (bytes[3] !== 0x20 /* SPACE */)

  ) {
    throw new Error(`Not a VOX file`);
  }

  const version: number = read_u32_be_from_uint8_array(bytes, 4);

  if (version !== 150) {
    throw new Error(`Unsupported version`);
  }

  const [chunk, remaining] = decode_unknown_vox_chunk(bytes.subarray(8));

  if (chunk.type !== 'main') {
    throw new Error(`Expected MAIN Chunk`);
  }

  if (remaining.length !== 0) {
    throw new Error(`Unexpected remaining bytes`);
  }

  return chunk;
}
