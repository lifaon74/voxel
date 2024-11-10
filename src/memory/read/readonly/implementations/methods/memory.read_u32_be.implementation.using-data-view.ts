import { u32, u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadU32BETrait } from '../../traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../traits/methods/memory.read_u8.trait';

export abstract class MemoryReadU32BEImplementationUsingDataView implements MemoryReadU32BETrait {
  read_u32_be(this: MemoryPrivateDataViewTrait, address: MemoryAddress): u32 {
    return this[PRIVATE].dataView.getUint32(address, false);
  }
}
