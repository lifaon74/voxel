import { char_string, f32, SIZEOF_F32, u32, usize } from '@lifaon/math';
import { MemoryReaderTrait } from '../../../../memory/read/reader/traits/memory-reader.trait';
import { MattVoxMaterialType } from '../matt/matt-vox-chunk';
import { RGBAVoxColor } from '../rgba/rgba-vox-color';
import { XYZIVoxel } from '../xyzi/xyzi-voxel';
import { UnknownVoxChunk } from './unknown-vox-chunk';

export function read_unknown_vox_chunk(reader: MemoryReaderTrait): UnknownVoxChunk {
  const startCursor: usize = reader.cursor;

  const chunkId: char_string = reader.next_char_string(4);
  const chunkContentSize: u32 = reader.next_u32_le();
  const childrenChunksSize: u32 = reader.next_u32_le();

  const endCursor: usize = reader.cursor + chunkContentSize + childrenChunksSize;

  let chunk: UnknownVoxChunk;

  switch (chunkId) {
    case 'MAIN': {
      if (chunkContentSize !== 0) {
        throw new Error('MAIN chunk should not have content.');
      }

      const children: UnknownVoxChunk[] = [];
      while (reader.cursor < endCursor) {
        children.push(read_unknown_vox_chunk(reader));
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
        numberOfModels: reader.next_u32_le(),
      };

      break;
    }

    case 'SIZE': {
      if (childrenChunksSize !== 0) {
        throw new Error('SIZE chunk should not have children content.');
      }

      chunk = {
        type: 'size',
        x: reader.next_u32_le(),
        y: reader.next_u32_le(),
        z: reader.next_u32_le(),
      };

      break;
    }

    case 'XYZI': {
      if (childrenChunksSize !== 0) {
        throw new Error('XYZI chunk should not have children content.');
      }

      const voxels: XYZIVoxel[] = [];
      const numVoxels: u32 = reader.next_u32_le();

      for (let i: number = 0; i < numVoxels; i++) {
        voxels.push({
          x: reader.next_u8(),
          y: reader.next_u8(),
          z: reader.next_u8(),
          i: reader.next_u8(),
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
          r: reader.next_u8(),
          g: reader.next_u8(),
          b: reader.next_u8(),
          a: reader.next_u8(),
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

      const _startCursor: usize = reader.cursor;

      const id: u32 = reader.next_u32_le();
      const materialType: MattVoxMaterialType = reader.next_u32_le();
      const weight: f32 = reader.next_f32_le();
      const propertyBits: u32 = reader.next_u32_le();

      const propertyValuesSize: usize = chunkContentSize + _startCursor - reader.cursor;
      const propertyValues: Float32Array = new Float32Array(propertyValuesSize / SIZEOF_F32);

      for (let i: number = 0; i < propertyValues.length; i++) {
        propertyValues[i] = reader.next_f32_le();
      }

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

  const actualEndCursor: usize = reader.cursor;

  if (actualEndCursor !== endCursor) {
    throw new Error(
      `The chunk at position ${startCursor} is invalid. It reports a size of ${endCursor - startCursor} bytes, but its decoded content has a size of ${actualEndCursor - startCursor}.`,
    );
  }

  return chunk;
}
