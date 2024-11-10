import { u32 } from '@lifaon/math';

export function createDataViewFromBufferSourceLike(size: u32): DataView;
export function createDataViewFromBufferSourceLike(buffer: ArrayBufferView): DataView;
export function createDataViewFromBufferSourceLike(
  buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: never },
  byteOffset?: number,
  byteLength?: number,
): DataView;
export function createDataViewFromBufferSourceLike(
  buffer: u32 | ArrayBufferView | (ArrayBufferLike & { BYTES_PER_ELEMENT?: never }),
  byteOffset?: number,
  byteLength?: number,
): DataView {
  if (buffer instanceof DataView) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (typeof buffer === 'number') {
    return new DataView(new ArrayBuffer(buffer));
  } else {
    return new DataView(buffer, byteOffset, byteLength);
  }
}
