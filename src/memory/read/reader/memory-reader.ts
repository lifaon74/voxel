import { char_string, f32, SIZEOF_F32, SIZEOF_U32, SIZEOF_U8, u32, u8, usize } from '@lifaon/math';
import { mixin, PRIVATE } from '@lifaon/traits';
import { createDataViewFromBufferSourceLike } from '../../shared/functions/create-data-view-from-buffer-source-like';
import { createMemoryBytesPropertyFromMemoryDataView } from '../../shared/functions/create-memory-bytes-property-from-memory-data-view';
import { MemoryAddress } from '../../shared/memory-address';
import { MemoryPrivateDataView } from '../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadCharStringImplementationUsingDataView } from '../readonly/implementations/methods/memory.read_char_string.implementation.using-data-view';
import { MemoryReadF32BEImplementationUsingDataView } from '../readonly/implementations/methods/memory.read_f32_be.implementation.using-data-view';
import { MemoryReadF32LEImplementationUsingDataView } from '../readonly/implementations/methods/memory.read_f32_le.implementation.using-data-view';
import { MemoryReadU32BEImplementationUsingDataView } from '../readonly/implementations/methods/memory.read_u32_be.implementation.using-data-view';
import { MemoryReadU32LEImplementationUsingDataView } from '../readonly/implementations/methods/memory.read_u32_le.implementation.using-data-view';
import { MemoryReadU8ImplementationUsingDataView } from '../readonly/implementations/methods/memory.read_u8.implementation.using-data-view';
import { ReadonlyMemory } from '../readonly/readonly-memory';
import { MemoryReaderNextU8ImplementationUsingNextAndCharString } from './implementations/methods/memory-reader.next_char_string.implementation.using-next-and-read-char-string';
import { MemoryReaderNextF32BEImplementationUsingNextAndReadF32BE } from './implementations/methods/memory-reader.next_f32_be.implementation.using-next-and-read-f32-be';
import { MemoryReaderNextF32LEImplementationUsingNextAndReadF32LE } from './implementations/methods/memory-reader.next_f32_le.implementation.using-next-and-read-f32-le';
import { MemoryReaderNextU32BEImplementationUsingNextAndReadU32BE } from './implementations/methods/memory-reader.next_u32_be.implementation.using-next-and-read-u32-be';
import { MemoryReaderNextU32LEImplementationUsingNextAndReadU32LE } from './implementations/methods/memory-reader.next_u32_le.implementation.using-next-and-read-u32-le';
import { MemoryReaderNextU8ImplementationUsingNextAndReadU8 } from './implementations/methods/memory-reader.next_u8.implementation.using-next-and-read-u8';
import { MemoryReaderTrait } from './traits/memory-reader.trait';

export class MemoryReader
  extends mixin<
    [
      // readonly
      MemoryReadU8ImplementationUsingDataView,
      MemoryReadU32LEImplementationUsingDataView,
      MemoryReadU32BEImplementationUsingDataView,
      MemoryReadF32LEImplementationUsingDataView,
      MemoryReadF32BEImplementationUsingDataView,
      MemoryReadCharStringImplementationUsingDataView,
      // next
      MemoryReaderNextU8ImplementationUsingNextAndReadU8,
      MemoryReaderNextU32LEImplementationUsingNextAndReadU32LE,
      MemoryReaderNextU32BEImplementationUsingNextAndReadU32BE,
      MemoryReaderNextF32LEImplementationUsingNextAndReadF32LE,
      MemoryReaderNextF32BEImplementationUsingNextAndReadF32BE,
      MemoryReaderNextU8ImplementationUsingNextAndCharString,
    ]
  >([
    // readonly
    MemoryReadU8ImplementationUsingDataView,
    MemoryReadU32LEImplementationUsingDataView,
    MemoryReadU32BEImplementationUsingDataView,
    MemoryReadF32LEImplementationUsingDataView,
    MemoryReadF32BEImplementationUsingDataView,
    MemoryReadCharStringImplementationUsingDataView,
    // next
    MemoryReaderNextU8ImplementationUsingNextAndReadU8,
    MemoryReaderNextU32LEImplementationUsingNextAndReadU32LE,
    MemoryReaderNextU32BEImplementationUsingNextAndReadU32BE,
    MemoryReaderNextF32LEImplementationUsingNextAndReadF32LE,
    MemoryReaderNextF32BEImplementationUsingNextAndReadF32BE,
    MemoryReaderNextU8ImplementationUsingNextAndCharString,
  ])
  implements MemoryReaderTrait
{
  #cursor: number = 0;

  readonly [PRIVATE]: MemoryPrivateDataView;

  readonly bytes: Uint8Array;

  constructor(buffer: ArrayBufferView);
  constructor(
    buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: never },
    byteOffset?: number,
    byteLength?: number,
  );
  constructor(
    buffer: ArrayBufferView | (ArrayBufferLike & { BYTES_PER_ELEMENT?: never }),
    byteOffset?: number,
    byteLength?: number,
  ) {
    super();
    this[PRIVATE] = {
      dataView: createDataViewFromBufferSourceLike(buffer as any, byteOffset, byteLength),
    };
    this.bytes = createMemoryBytesPropertyFromMemoryDataView(this);
  }

  get cursor(): usize {
    return this.#cursor;
  }

  next(size: usize): MemoryAddress {
    if (size === 0) {
      return this.#cursor;
    } else {
      const index: number = this.#cursor;
      this.#cursor += size;
      if (this.#cursor > this.bytes.byteLength) {
        throw new Error('Read failed: not enough bytes.');
      }
      return index;
    }
  }
}
