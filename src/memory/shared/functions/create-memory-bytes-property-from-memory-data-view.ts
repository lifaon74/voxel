import { PRIVATE } from '@lifaon/traits';
import { MemoryPrivateDataViewTrait } from '../traits/properties/memory.private-data-view.trait';

export function createMemoryBytesPropertyFromMemoryDataView(
  self: MemoryPrivateDataViewTrait,
): Uint8Array {
  return new Uint8Array(
    self[PRIVATE].dataView.buffer,
    self[PRIVATE].dataView.byteOffset,
    self[PRIVATE].dataView.byteLength,
  );
}
