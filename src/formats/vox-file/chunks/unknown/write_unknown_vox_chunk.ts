import { char_string, SIZEOF_U32, u32, usize } from '@lifaon/math';
import { MemoryWriter } from '../../../../memory/write/writer/memory-writer';
import { RGBAVoxColor } from '../rgba/rgba-vox-color';
import { XYZIVoxel } from '../xyzi/xyzi-voxel';
import { UnknownVoxChunk } from './unknown-vox-chunk';

export function write_unknown_vox_chunk(writer: MemoryWriter, chunk: UnknownVoxChunk): void {
  let chunkId: char_string;
  const chunkIdCursor: usize = writer.next(4); // VOX

  let chunkContentSize: u32 = 0;
  const chunkContentSizeCursor: usize = writer.next(SIZEOF_U32);

  let childrenChunksSize: u32 = 0;
  const childrenChunksSizeCursor: usize = writer.next(SIZEOF_U32);

  switch (chunk.type) {
    case 'main': {
      chunkId = 'MAIN';

      const start: usize = writer.cursor;

      for (let i: number = 0; i < chunk.children.length; i++) {
        write_unknown_vox_chunk(writer, chunk.children[i]);
      }

      childrenChunksSize = writer.cursor - start;

      break;
    }

    case 'pack': {
      chunkId = 'PACK';

      const start: usize = writer.cursor;

      writer.next_u32_le(chunk.numberOfModels);

      chunkContentSize = writer.cursor - start;

      break;
    }

    case 'size': {
      chunkId = 'SIZE';

      const start: usize = writer.cursor;

      writer.next_u32_le(chunk.x);
      writer.next_u32_le(chunk.y);
      writer.next_u32_le(chunk.z);

      chunkContentSize = writer.cursor - start;

      break;
    }

    case 'xyzi': {
      chunkId = 'XYZI';

      const start: usize = writer.cursor;

      writer.next_u32_le(chunk.voxels.length);

      for (let i: number = 0; i < chunk.voxels.length; i++) {
        const voxel: XYZIVoxel = chunk.voxels[i];
        writer.next_u8(voxel.x);
        writer.next_u8(voxel.y);
        writer.next_u8(voxel.z);
        writer.next_u8(voxel.i);
      }

      chunkContentSize = writer.cursor - start;

      break;
    }

    case 'rgba': {
      chunkId = 'RGBA';

      const start: usize = writer.cursor;

      if (chunk.colors.length !== 256) {
        throw new Error('RGBA chunk should have 256 colors.');
      }

      for (let i: number = 0; i < chunk.colors.length; i++) {
        const color: RGBAVoxColor = chunk.colors[i];
        writer.next_u8(color.r);
        writer.next_u8(color.g);
        writer.next_u8(color.b);
        writer.next_u8(color.a);
      }

      chunkContentSize = writer.cursor - start;

      break;
    }

    // TODO MATT

    default:
      throw new Error(`Unknown chunk: ${chunk.type}.`);
  }

  writer.write_char_string(chunkIdCursor, chunkId);
  writer.write_u32_le(chunkContentSizeCursor, chunkContentSize);
  writer.write_u32_le(childrenChunksSizeCursor, childrenChunksSize);
}
