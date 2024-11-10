import { u32, usize } from '@lifaon/math';
import { mixin, PRIVATE } from '@lifaon/traits';
import { createDataViewFromBufferSourceLike } from '../../shared/functions/create-data-view-from-buffer-source-like';
import { createMemoryBytesPropertyFromMemoryDataView } from '../../shared/functions/create-memory-bytes-property-from-memory-data-view';

import { MemoryAddress } from '../../shared/memory-address';
import { MemoryPrivateDataView } from '../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteCharStringImplementationUsingDataView } from '../writeonly/implementations/methods/memory.write_char_string.implementation.using-data-view';
import { MemoryWriteF32BEImplementationUsingDataView } from '../writeonly/implementations/methods/memory.write_f32_be.implementation.using-data-view';
import { MemoryWriteF32LEImplementationUsingDataView } from '../writeonly/implementations/methods/memory.write_f32_le.implementation.using-data-view';
import { MemoryWriteU32BEImplementationUsingDataView } from '../writeonly/implementations/methods/memory.write_u32_be.implementation.using-data-view';
import { MemoryWriteU32LEImplementationUsingDataView } from '../writeonly/implementations/methods/memory.write_u32_le.implementation.using-data-view';
import { MemoryWriteU8ImplementationUsingDataView } from '../writeonly/implementations/methods/memory.write_u8.implementation.using-data-view';
import { MemoryWriterNextU8ImplementationUsingNextAndCharString } from './implementations/methods/memory-writer.next_char_string.implementation.using-next-and-write-char-string';
import { MemoryWriterNextF32BEImplementationUsingNextAndWriteF32BE } from './implementations/methods/memory-writer.next_f32_be.implementation.using-next-and-write-f32-be';
import { MemoryWriterNextF32LEImplementationUsingNextAndWriteF32LE } from './implementations/methods/memory-writer.next_f32_le.implementation.using-next-and-write-f32-le';
import { MemoryWriterNextU32BEImplementationUsingNextAndWriteU32BE } from './implementations/methods/memory-writer.next_u32_be.implementation.using-next-and-write-u32-be';
import { MemoryWriterNextU32LEImplementationUsingNextAndWriteU32LE } from './implementations/methods/memory-writer.next_u32_le.implementation.using-next-and-write-u32-le';
import { MemoryWriterNextU8ImplementationUsingNextAndWriteU8 } from './implementations/methods/memory-writer.next_u8.implementation.using-next-and-write-u8';
import { MemoryWriterTrait } from './traits/memory-writer.trait';

export class MemoryWriter
  extends mixin<
    [
      // writeonly
      MemoryWriteU8ImplementationUsingDataView,
      MemoryWriteU32LEImplementationUsingDataView,
      MemoryWriteU32BEImplementationUsingDataView,
      MemoryWriteF32LEImplementationUsingDataView,
      MemoryWriteF32BEImplementationUsingDataView,
      MemoryWriteCharStringImplementationUsingDataView,
      // next
      MemoryWriterNextU8ImplementationUsingNextAndWriteU8,
      MemoryWriterNextU32LEImplementationUsingNextAndWriteU32LE,
      MemoryWriterNextU32BEImplementationUsingNextAndWriteU32BE,
      MemoryWriterNextF32LEImplementationUsingNextAndWriteF32LE,
      MemoryWriterNextF32BEImplementationUsingNextAndWriteF32BE,
      MemoryWriterNextU8ImplementationUsingNextAndCharString,
    ]
  >([
    // writeonly
    MemoryWriteU8ImplementationUsingDataView,
    MemoryWriteU32LEImplementationUsingDataView,
    MemoryWriteU32BEImplementationUsingDataView,
    MemoryWriteF32LEImplementationUsingDataView,
    MemoryWriteF32BEImplementationUsingDataView,
    MemoryWriteCharStringImplementationUsingDataView,
    // next
    MemoryWriterNextU8ImplementationUsingNextAndWriteU8,
    MemoryWriterNextU32LEImplementationUsingNextAndWriteU32LE,
    MemoryWriterNextU32BEImplementationUsingNextAndWriteU32BE,
    MemoryWriterNextF32LEImplementationUsingNextAndWriteF32LE,
    MemoryWriterNextF32BEImplementationUsingNextAndWriteF32BE,
    MemoryWriterNextU8ImplementationUsingNextAndCharString,
  ])
  implements MemoryWriterTrait
{
  #cursor: number = 0;

  readonly [PRIVATE]: MemoryPrivateDataView;

  readonly bytes: Uint8Array;

  constructor(size: u32);
  constructor(buffer: ArrayBufferView);
  constructor(
    buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: never },
    byteOffset?: number,
    byteLength?: number,
  );
  constructor(
    buffer: u32 | ArrayBufferView | (ArrayBufferLike & { BYTES_PER_ELEMENT?: never }),
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
        throw new Error('Write failed: not enough bytes.');
      }
      return index;
    }
  }
}
