import {
  alloc_f32,
  alloc_u32,
  AllocFunction,
  create_alloc_function_for_bytes_buffer,
  read_f32_be_from_bytes_buffer,
  read_u32_be_from_bytes_buffer,
} from '@lifaon/math';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { IMattVoxChunk } from './matt-vox-chunk.type';

export function convert_generic_vox_chunk_to_matt_vox_chunk(
  chunk: IGenericVoxChunk,
): IMattVoxChunk {
  if (chunk.childrenBytes.length !== 0) {
    throw new Error('MATT chunk should not have children content');
  }

  const alloc: AllocFunction = create_alloc_function_for_bytes_buffer(chunk.bytes);

  return {
    type: 'matt',
    id: read_u32_be_from_bytes_buffer(chunk.bytes, alloc_u32(alloc)),
    materialType: read_u32_be_from_bytes_buffer(chunk.bytes, alloc_u32(alloc)),
    weight: read_f32_be_from_bytes_buffer(chunk.bytes, alloc_f32(alloc)),
    propertyBits: read_u32_be_from_bytes_buffer(chunk.bytes, alloc_u32(alloc)),
    propertyValues: new Float32Array(
      chunk.bytes.buffer,
      chunk.bytes.byteOffset + alloc(0),
      (chunk.bytes.length - alloc(0)) / Float32Array.BYTES_PER_ELEMENT,
    ),
  };
}
