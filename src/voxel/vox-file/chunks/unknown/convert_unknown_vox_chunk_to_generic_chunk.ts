import { IUnknownVoxChunk } from './unknown-vox-chunk.type';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { convert_main_vox_chunk_to_generic_vox_chunk } from '../main/convert_main_vox_chunk_to_generic_vox_chunk';

// TODO
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
      throw new Error(`Unknown chunk: ${ chunk.type }`);
  }
}
