import { u32 } from '@lifaon/math';
import { IGenericVoxChunk } from '../decode_generic_vox_chunk';

import { IRGBAVoxChunk } from './rgba-vox-chunk.type';
import { IRGBAVoxColor } from './rgba-vox-color.type';

export function convert_generic_vox_chunk_to_rgba_vox_chunk(
  chunk: IGenericVoxChunk,
): IRGBAVoxChunk {
  if (chunk.childrenBytes.length !== 0) {
    throw new Error(`RGBA chunk should not have children content`);
  }

  if (chunk.bytes.length !== 1024) {
    throw new Error(`RGBA chunk should not have a size of 1024`);
  }

  const colors: IRGBAVoxColor[] = [];

  const count: u32 = 256;
  let index: u32 = 0;

  for (let i = 0; i < count; i++, index += 4) {
    colors.push({
      r: chunk.bytes[index],
      g: chunk.bytes[index + 1],
      b: chunk.bytes[index + 2],
      a: chunk.bytes[index + 3],
    });
  }

  return {
    type: 'rgba',
    colors,
  };
}
