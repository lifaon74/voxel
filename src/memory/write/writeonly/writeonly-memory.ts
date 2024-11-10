import { mixin, PRIVATE } from '@lifaon/traits';
import { createDataViewFromBufferSourceLike } from '../../shared/functions/create-data-view-from-buffer-source-like';
import { createMemoryBytesPropertyFromMemoryDataView } from '../../shared/functions/create-memory-bytes-property-from-memory-data-view';
import { MemoryPrivateDataView } from '../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteCharStringImplementationUsingDataView } from './implementations/methods/memory.write_char_string.implementation.using-data-view';
import { MemoryWriteF32BEImplementationUsingDataView } from './implementations/methods/memory.write_f32_be.implementation.using-data-view';
import { MemoryWriteF32LEImplementationUsingDataView } from './implementations/methods/memory.write_f32_le.implementation.using-data-view';
import { MemoryWriteU32BEImplementationUsingDataView } from './implementations/methods/memory.write_u32_be.implementation.using-data-view';
import { MemoryWriteU32LEImplementationUsingDataView } from './implementations/methods/memory.write_u32_le.implementation.using-data-view';
import { MemoryWriteU8ImplementationUsingDataView } from './implementations/methods/memory.write_u8.implementation.using-data-view';
import { WriteonlyMemoryTrait } from './traits/writeonly-memory.trait';

export class WriteonlyMemory
  extends mixin<
    [
      MemoryWriteU8ImplementationUsingDataView,
      MemoryWriteU32LEImplementationUsingDataView,
      MemoryWriteU32BEImplementationUsingDataView,
      MemoryWriteF32LEImplementationUsingDataView,
      MemoryWriteF32BEImplementationUsingDataView,
      MemoryWriteCharStringImplementationUsingDataView,
    ]
  >([
    MemoryWriteU8ImplementationUsingDataView,
    MemoryWriteU32LEImplementationUsingDataView,
    MemoryWriteU32BEImplementationUsingDataView,
    MemoryWriteF32LEImplementationUsingDataView,
    MemoryWriteF32BEImplementationUsingDataView,
    MemoryWriteCharStringImplementationUsingDataView,
  ])
  implements WriteonlyMemoryTrait
{
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
}
