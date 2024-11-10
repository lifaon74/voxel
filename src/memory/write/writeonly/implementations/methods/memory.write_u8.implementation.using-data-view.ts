import { u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteU8Trait } from '../../traits/methods/memory.write_u8.trait';

export abstract class MemoryWriteU8ImplementationUsingDataView implements MemoryWriteU8Trait {
  write_u8(this: MemoryPrivateDataViewTrait, address: MemoryAddress, value: u8): void {
    return this[PRIVATE].dataView.setUint8(address, value);
  }
}
