import { mixin, PRIVATE } from '@lifaon/traits';
import { createDataViewFromBufferSourceLike } from '../../shared/functions/create-data-view-from-buffer-source-like';
import { createMemoryBytesPropertyFromMemoryDataView } from '../../shared/functions/create-memory-bytes-property-from-memory-data-view';
import { MemoryPrivateDataView } from '../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadCharStringImplementationUsingDataView } from './implementations/methods/memory.read_char_string.implementation.using-data-view';
import { MemoryReadF32BEImplementationUsingDataView } from './implementations/methods/memory.read_f32_be.implementation.using-data-view';
import { MemoryReadF32LEImplementationUsingDataView } from './implementations/methods/memory.read_f32_le.implementation.using-data-view';
import { MemoryReadU32BEImplementationUsingDataView } from './implementations/methods/memory.read_u32_be.implementation.using-data-view';
import { MemoryReadU32LEImplementationUsingDataView } from './implementations/methods/memory.read_u32_le.implementation.using-data-view';
import { MemoryReadU8ImplementationUsingDataView } from './implementations/methods/memory.read_u8.implementation.using-data-view';
import { ReadonlyMemoryTrait } from './traits/readonly-memory.trait';

export class ReadonlyMemory
  extends mixin<
    [
      MemoryReadU8ImplementationUsingDataView,
      MemoryReadU32LEImplementationUsingDataView,
      MemoryReadU32BEImplementationUsingDataView,
      MemoryReadF32LEImplementationUsingDataView,
      MemoryReadF32BEImplementationUsingDataView,
      MemoryReadCharStringImplementationUsingDataView,
    ]
  >([
    MemoryReadU8ImplementationUsingDataView,
    MemoryReadU32LEImplementationUsingDataView,
    MemoryReadU32BEImplementationUsingDataView,
    MemoryReadF32LEImplementationUsingDataView,
    MemoryReadF32BEImplementationUsingDataView,
    MemoryReadCharStringImplementationUsingDataView,
  ])
  implements ReadonlyMemoryTrait
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
