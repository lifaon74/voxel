import { u32 } from '@lifaon/math';
import { read_u32_be_from_uint8_array } from '../../../functions/read_u32_be_from_uint8_array';

export interface IGenericVoxChunk {
  id: string;
  bytes: Uint8Array;
  childrenBytes: Uint8Array;
}

export function decode_generic_vox_chunk(
  bytes: Uint8Array,
): [chunk: IGenericVoxChunk, remaining: Uint8Array] {
  const byteLength: u32 = read_u32_be_from_uint8_array(bytes, 4);
  const byteOffsetStart: u32 = 12;
  const byteOffsetEnd: u32 = byteOffsetStart + byteLength;

  const childrenByteLength: u32 = read_u32_be_from_uint8_array(bytes, 8);
  const childrenByteOffsetStart: u32 = byteOffsetEnd;
  const childrenByteOffsetEnd: u32 = childrenByteOffsetStart + childrenByteLength;

  return [
    {
      id: String.fromCodePoint(...bytes.slice(0, 4)),
      bytes: bytes.subarray(byteOffsetStart, byteOffsetEnd),
      childrenBytes: bytes.subarray(childrenByteOffsetStart, childrenByteOffsetEnd),
    },
    bytes.subarray(childrenByteOffsetEnd),
  ];
}
