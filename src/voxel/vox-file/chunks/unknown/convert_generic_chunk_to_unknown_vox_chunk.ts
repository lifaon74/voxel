import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import {
  convert_generic_vox_chunk_to_main_vox_chunk,
  convert_main_vox_chunk_to_generic_vox_chunk,
} from '../main/convert_generic_vox_chunk_to_main_vox_chunk';
import { convert_generic_vox_chunk_to_matt_vox_chunk } from '../matt/convert_generic_vox_chunk_to_matt_vox_chunk';

import { convert_generic_vox_chunk_to_pack_vox_chunk } from '../pack/convert_generic_vox_chunk_to_pack_vox_chunk';
import { convert_generic_vox_chunk_to_rgba_vox_chunk } from '../rgba/convert_generic_vox_chunk_to_rgba_vox_chunk';
import { convert_generic_vox_chunk_to_size_vox_chunk } from '../size/convert_generic_vox_chunk_to_size_vox_chunk';
import { convert_generic_vox_chunk_to_xyzi_vox_chunk } from '../xyzi/convert_generic_vox_chunk_to_xyzi_vox_chunk';
import { IUnknownVoxChunk } from './unknown-vox-chunk.type';

export function convert_generic_chunk_to_unknown_vox_chunk(
  chunk: IGenericVoxChunk,
): IUnknownVoxChunk {
  switch (chunk.id) {
    case 'MAIN':
      return convert_generic_vox_chunk_to_main_vox_chunk(chunk);
    case 'PACK':
      return convert_generic_vox_chunk_to_pack_vox_chunk(chunk);
    case 'SIZE':
      return convert_generic_vox_chunk_to_size_vox_chunk(chunk);
    case 'XYZI':
      return convert_generic_vox_chunk_to_xyzi_vox_chunk(chunk);
    case 'RGBA':
      return convert_generic_vox_chunk_to_rgba_vox_chunk(chunk);
    case 'MATT':
      return convert_generic_vox_chunk_to_matt_vox_chunk(chunk);
    default:
      throw new Error(`Unknown chunk: ${chunk.id}`);
    // return {
    //   type: 'unsupported',
    // };
  }
}

// TODO continue here
export function convert_unknown_vox_chunk_to_generic_chunk(
  chunk: IUnknownVoxChunk,
): IGenericVoxChunk {
  switch (chunk.type) {
    case 'main':
      return convert_main_vox_chunk_to_generic_vox_chunk(chunk);
    // case 'PACK':
    //   return convert_generic_vox_chunk_to_pack_vox_chunk(chunk);
    // case 'SIZE':
    //   return convert_generic_vox_chunk_to_size_vox_chunk(chunk);
    // case 'XYZI':
    //   return convert_generic_vox_chunk_to_xyzi_vox_chunk(chunk);
    // case 'RGBA':
    //   return convert_generic_vox_chunk_to_rgba_vox_chunk(chunk);
    // case 'MATT':
    //   return convert_generic_vox_chunk_to_matt_vox_chunk(chunk);
    default:
      throw new Error(`Unknown chunk: ${chunk.type}`);
  }
}
