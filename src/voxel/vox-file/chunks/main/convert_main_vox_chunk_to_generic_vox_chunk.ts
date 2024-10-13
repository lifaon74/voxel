import { IMainVoxChunk } from './main-vox-chunk.type';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { AllocFunction, BytesBuffer, create_alloc_function_for_bytes_buffer, create_bytes_buffer } from '@lifaon/math';
import { encode_unknown_vox_chunk } from '../unknown/encode_unknown_vox_chunk';

export function convert_main_vox_chunk_to_generic_vox_chunk(
  chunk: IMainVoxChunk,
): IGenericVoxChunk {
  const buffer: BytesBuffer = create_bytes_buffer(2 ** 24); // 16MB
  const alloc: AllocFunction = create_alloc_function_for_bytes_buffer(buffer);

  for (let i = 0; i < chunk.children.length; i++) {
    encode_unknown_vox_chunk(buffer, alloc, chunk.children[i]);
  }

  return {
    id: 'MAIN',
    bytes: new Uint8Array(),
    childrenBytes: buffer.slice(0, alloc(0)),
  };
}
