import {
  alloc_u32,
  alloc_u8,
  AllocFunction,
  BytesBuffer,
  char_string,
  u32,
  write_char_string_in_bytes_buffer,
  write_u32_be_in_bytes_buffer,
  write_u8_in_bytes_buffer,
} from '@lifaon/math';
import { usize } from '@lifaon/math/types/numbers/usize/usize.type';
import { RGBAVoxColor } from '../rgba/rgba-vox-color';
import { XYZIVoxel } from '../xyzi/xyzi-voxel';
import { UnknownVoxChunk } from './unknown-vox-chunk';

export function write_unknown_vox_chunk_in_bytes_buffer(
  buffer: BytesBuffer,
  alloc: AllocFunction,
  chunk: UnknownVoxChunk,
): void {
  let chunkId: char_string;
  const chunkIdCursor: usize = alloc(4);

  let chunkContentSize: u32 = 0;
  const chunkContentSizeCursor: usize = alloc_u32(alloc);

  let childrenChunksSize: u32 = 0;
  const childrenChunksSizeCursor: usize = alloc_u32(alloc);

  switch (chunk.type) {
    case 'main': {
      chunkId = 'MAIN';

      const start: usize = alloc(0);

      for (let i: number = 0; i < chunk.children.length; i++) {
        write_unknown_vox_chunk_in_bytes_buffer(buffer, alloc, chunk.children[i]);
      }

      childrenChunksSize = alloc(0) - start;

      break;
    }

    case 'pack': {
      chunkId = 'PACK';

      const start: usize = alloc(0);

      write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.numberOfModels);

      chunkContentSize = alloc(0) - start;

      break;
    }

    case 'size': {
      chunkId = 'SIZE';

      const start: usize = alloc(0);

      write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.x);
      write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.y);
      write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.z);

      chunkContentSize = alloc(0) - start;

      break;
    }

    case 'xyzi': {
      chunkId = 'XYZI';

      const start: usize = alloc(0);

      write_u32_be_in_bytes_buffer(buffer, alloc_u32(alloc), chunk.voxels.length);

      for (let i: number = 0; i < chunk.voxels.length; i++) {
        const voxel: XYZIVoxel = chunk.voxels[i];
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), voxel.x);
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), voxel.y);
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), voxel.z);
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), voxel.i);
      }

      chunkContentSize = alloc(0) - start;

      break;
    }

    case 'rgba': {
      chunkId = 'RGBA';

      const start: usize = alloc(0);

      if (chunk.colors.length !== 256) {
        throw new Error('RGBA chunk should have 256 colors.');
      }

      for (let i: number = 0; i < chunk.colors.length; i++) {
        const color: RGBAVoxColor = chunk.colors[i];
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), color.r);
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), color.g);
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), color.b);
        write_u8_in_bytes_buffer(buffer, alloc_u8(alloc), color.a);
      }

      chunkContentSize = alloc(0) - start;

      break;
    }

    // TODO MATT

    default:
      throw new Error(`Unknown chunk: ${chunk.type}.`);
  }

  write_char_string_in_bytes_buffer(buffer, chunkIdCursor, chunkId);
  write_u32_be_in_bytes_buffer(buffer, chunkContentSizeCursor, chunkContentSize);
  write_u32_be_in_bytes_buffer(buffer, childrenChunksSizeCursor, childrenChunksSize);
}
