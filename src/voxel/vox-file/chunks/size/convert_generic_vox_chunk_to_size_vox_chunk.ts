import { alloc_u32, AllocFunction, create_alloc_function_for_bytes_buffer, read_u32_be_from_bytes_buffer } from '@lifaon/math';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { ISizeVoxChunk } from './size-vox-chunk.type';

export function convert_generic_vox_chunk_to_size_vox_chunk(
  chunk: IGenericVoxChunk,
): ISizeVoxChunk {
  if (chunk.childrenBytes.length !== 0) {
    throw new Error('SIZE chunk should not have children content');
  }

  const alloc: AllocFunction = create_alloc_function_for_bytes_buffer(chunk.bytes);

  return {
    type: 'size',
    x: read_u32_be_from_bytes_buffer(chunk.bytes, alloc_u32(alloc)),
    y: read_u32_be_from_bytes_buffer(chunk.bytes, alloc_u32(alloc)),
    z: read_u32_be_from_bytes_buffer(chunk.bytes, alloc_u32(alloc)),
  };
}
