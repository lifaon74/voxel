import { u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadU8Trait } from '../../traits/methods/memory.read_u8.trait';

export abstract class MemoryReadU8ImplementationUsingDataView implements MemoryReadU8Trait {
  read_u8(this: MemoryPrivateDataViewTrait, address: MemoryAddress): u8 {
    return this[PRIVATE].dataView.getUint8(address);
  }
}
