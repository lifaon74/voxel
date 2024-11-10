import { char_string, f32, u32, u8 } from '@lifaon/math';
import { mixin, PRIVATE } from '@lifaon/traits';
import { MemoryReadCharStringImplementationUsingDataView } from '../../read/readonly/implementations/methods/memory.read_char_string.implementation.using-data-view';
import { MemoryReadF32BEImplementationUsingDataView } from '../../read/readonly/implementations/methods/memory.read_f32_be.implementation.using-data-view';
import { MemoryReadF32LEImplementationUsingDataView } from '../../read/readonly/implementations/methods/memory.read_f32_le.implementation.using-data-view';
import { MemoryReadU32BEImplementationUsingDataView } from '../../read/readonly/implementations/methods/memory.read_u32_be.implementation.using-data-view';
import { MemoryReadU32LEImplementationUsingDataView } from '../../read/readonly/implementations/methods/memory.read_u32_le.implementation.using-data-view';
import { MemoryReadU8ImplementationUsingDataView } from '../../read/readonly/implementations/methods/memory.read_u8.implementation.using-data-view';
import { ReadonlyMemory } from '../../read/readonly/readonly-memory';
import { MemoryWriteCharStringImplementationUsingDataView } from '../../write/writeonly/implementations/methods/memory.write_char_string.implementation.using-data-view';
import { MemoryWriteF32BEImplementationUsingDataView } from '../../write/writeonly/implementations/methods/memory.write_f32_be.implementation.using-data-view';
import { MemoryWriteF32LEImplementationUsingDataView } from '../../write/writeonly/implementations/methods/memory.write_f32_le.implementation.using-data-view';
import { MemoryWriteU32BEImplementationUsingDataView } from '../../write/writeonly/implementations/methods/memory.write_u32_be.implementation.using-data-view';
import { MemoryWriteU32LEImplementationUsingDataView } from '../../write/writeonly/implementations/methods/memory.write_u32_le.implementation.using-data-view';
import { MemoryWriteU8ImplementationUsingDataView } from '../../write/writeonly/implementations/methods/memory.write_u8.implementation.using-data-view';
import { createDataViewFromBufferSourceLike } from '../functions/create-data-view-from-buffer-source-like';
import { createMemoryBytesPropertyFromMemoryDataView } from '../functions/create-memory-bytes-property-from-memory-data-view';
import { MemoryAddress } from '../memory-address';
import { MemoryPrivateDataView } from '../traits/properties/memory.private-data-view.trait';
import { StaticMemoryTrait } from './traits/static-memory.trait';

export class StaticMemory
  extends mixin<
    [
      // read
      MemoryReadU8ImplementationUsingDataView,
      MemoryReadU32LEImplementationUsingDataView,
      MemoryReadU32BEImplementationUsingDataView,
      MemoryReadF32LEImplementationUsingDataView,
      MemoryReadF32BEImplementationUsingDataView,
      MemoryReadCharStringImplementationUsingDataView,
      // write
      MemoryWriteU8ImplementationUsingDataView,
      MemoryWriteU32LEImplementationUsingDataView,
      MemoryWriteU32BEImplementationUsingDataView,
      MemoryWriteF32LEImplementationUsingDataView,
      MemoryWriteF32BEImplementationUsingDataView,
      MemoryWriteCharStringImplementationUsingDataView,
    ]
  >([
    // read
    MemoryReadU8ImplementationUsingDataView,
    MemoryReadU32LEImplementationUsingDataView,
    MemoryReadU32BEImplementationUsingDataView,
    MemoryReadF32LEImplementationUsingDataView,
    MemoryReadF32BEImplementationUsingDataView,
    MemoryReadCharStringImplementationUsingDataView,
    // write
    MemoryWriteU8ImplementationUsingDataView,
    MemoryWriteU32LEImplementationUsingDataView,
    MemoryWriteU32BEImplementationUsingDataView,
    MemoryWriteF32LEImplementationUsingDataView,
    MemoryWriteF32BEImplementationUsingDataView,
    MemoryWriteCharStringImplementationUsingDataView,
  ])
  implements StaticMemoryTrait
{
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
}
