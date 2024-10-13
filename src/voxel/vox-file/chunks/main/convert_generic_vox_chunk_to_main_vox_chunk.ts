import { AllocFunction, BytesBuffer, create_alloc_function_for_bytes_buffer } from '@lifaon/math';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { decode_unknown_vox_chunk } from '../unknown/decode_unknown_vox_chunk';
import { IUnknownVoxChunk } from '../unknown/unknown-vox-chunk.type';
import { IMainVoxChunk } from './main-vox-chunk.type';

export function convert_generic_vox_chunk_to_main_vox_chunk(
  chunk: IGenericVoxChunk,
): IMainVoxChunk {
  if (chunk.bytes.length !== 0) {
    throw new Error('MAIN chunk should not have content');
  }

  const children: IUnknownVoxChunk[] = [];
  const buffer: BytesBuffer = chunk.childrenBytes;
  const alloc: AllocFunction = create_alloc_function_for_bytes_buffer(buffer);

  while (buffer.length > alloc(0)) {
    children.push(decode_unknown_vox_chunk(buffer, alloc));
  }

  return {
    type: 'main',
    children,
  };
}

