import { decode_unknown_vox_chunk } from '../unknown/decode_unknown_vox_chunk';
import { IUnknownVoxChunk } from '../unknown/unknown-vox-chunk.type';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';
import { IMainVoxChunk } from './main-vox-chunk.type';

export function convert_generic_vox_chunk_to_main_vox_chunk(
  chunk: IGenericVoxChunk,
): IMainVoxChunk {
  if (chunk.bytes.length !== 0) {
    throw new Error(`MAIN chunk should not have content`);
  }

  const children: IUnknownVoxChunk[] = [];
  let bytes: Uint8Array = chunk.childrenBytes;

  while (bytes.length > 0) {
    let childChunk: IUnknownVoxChunk;
    [childChunk, bytes] = decode_unknown_vox_chunk(bytes);
    children.push(childChunk);
  }

  return {
    type: 'main',
    children,
  };
}
