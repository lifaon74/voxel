import {
  alloc_f32,
  alloc_u32,
  alloc_u8,
  AllocFunction,
  BytesBuffer,
  char_string,
  f32,
  read_char_string_from_bytes_buffer,
  read_f32_be_from_bytes_buffer,
  read_u32_be_from_bytes_buffer,
  read_u8_from_bytes_buffer,
  SIZEOF_F32,
  u32,
} from '@lifaon/math';
import { usize } from '@lifaon/math/types/numbers/usize/usize.type';
import { MattVoxMaterialType } from '../matt/matt-vox-chunk';
import { RGBAVoxColor } from '../rgba/rgba-vox-color';
import { XYZIVoxel } from '../xyzi/xyzi-voxel';
import { UnknownVoxChunk } from './unknown-vox-chunk';

export function read_unknown_vox_chunk_from_bytes_buffer(
  buffer: BytesBuffer,
  alloc: AllocFunction,
): UnknownVoxChunk {
  const startCursor: usize = alloc(0);

  const chunkId: char_string = read_char_string_from_bytes_buffer(buffer, alloc(4), 4);
  const chunkContentSize: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));
  const childrenChunksSize: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));

  const endCursor: usize = alloc(0) + chunkContentSize + childrenChunksSize;

  let chunk: UnknownVoxChunk;

  switch (chunkId) {
    case 'MAIN': {
      if (chunkContentSize !== 0) {
        throw new Error('MAIN chunk should not have content.');
      }

      const children: UnknownVoxChunk[] = [];
      while (alloc(0) < endCursor) {
        children.push(read_unknown_vox_chunk_from_bytes_buffer(buffer, alloc));
      }

      chunk = {
        type: 'main',
        children,
      };

      break;
    }

    case 'PACK': {
      if (childrenChunksSize !== 0) {
        throw new Error('PACK chunk should not have children content.');
      }

      chunk = {
        type: 'pack',
        numberOfModels: read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc)),
      };

      break;
    }

    case 'SIZE': {
      if (childrenChunksSize !== 0) {
        throw new Error('SIZE chunk should not have children content.');
      }

      chunk = {
        type: 'size',
        x: read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc)),
        y: read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc)),
        z: read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc)),
      };

      break;
    }

    case 'XYZI': {
      if (childrenChunksSize !== 0) {
        throw new Error('XYZI chunk should not have children content.');
      }

      const voxels: XYZIVoxel[] = [];
      const numVoxels: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));

      for (let i: number = 0; i < numVoxels; i++) {
        voxels.push({
          x: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
          y: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
          z: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
          i: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
        });
      }

      chunk = {
        type: 'xyzi',
        voxels,
      };

      break;
    }

    case 'RGBA': {
      if (chunkContentSize !== 1024) {
        throw new Error('RGBA chunk should not have a content size of 1024.');
      }

      if (childrenChunksSize !== 0) {
        throw new Error('RGBA chunk should not have children content.');
      }

      const colors: RGBAVoxColor[] = [];

      for (let i: number = 0; i < 256; i++) {
        colors.push({
          r: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
          g: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
          b: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
          a: read_u8_from_bytes_buffer(buffer, alloc_u8(alloc)),
        });
      }

      chunk = {
        type: 'rgba',
        colors,
      };

      break;
    }

    case 'MATT': {
      if (childrenChunksSize !== 0) {
        throw new Error('MATT chunk should not have children content.');
      }

      function read_f32_array_from_bytes_buffer(
        buffer: BytesBuffer,
        index: usize,
        output: Float32Array | usize,
      ): Float32Array {
        if (typeof output === 'number') {
          output = new Float32Array(output);
        }
        for (let i: number = 0; i < output.length; i++, index += SIZEOF_F32) {
          output[i] = read_f32_be_from_bytes_buffer(buffer, index);
        }
        return output;
      }

      const _startCursor: usize = alloc(0);

      const id: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));
      const materialType: MattVoxMaterialType = read_u32_be_from_bytes_buffer(
        buffer,
        alloc_u32(alloc),
      );
      const weight: f32 = read_f32_be_from_bytes_buffer(buffer, alloc_f32(alloc));
      const propertyBits: u32 = read_u32_be_from_bytes_buffer(buffer, alloc_u32(alloc));

      const propertyValuesSize: usize = chunkContentSize + _startCursor - alloc(0);
      const propertyValues: Float32Array = read_f32_array_from_bytes_buffer(
        buffer,
        alloc(propertyValuesSize),
        propertyValuesSize / SIZEOF_F32,
      );

      chunk = {
        type: 'matt',
        id,
        materialType,
        weight,
        propertyBits,
        propertyValues,
      };

      break;
    }

    default:
      throw new Error(`Unknown chunk: ${chunkId}.`);
  }

  const actualEndCursor: usize = alloc(0);

  if (actualEndCursor !== endCursor) {
    throw new Error(
      `The chunk at position ${startCursor} is invalid. It reports a size of ${endCursor - startCursor} bytes, but its decoded content has a size of ${actualEndCursor - startCursor}.`,
    );
  }

  return chunk;
}
