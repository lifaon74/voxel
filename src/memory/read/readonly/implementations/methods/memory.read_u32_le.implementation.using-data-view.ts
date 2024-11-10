import { u32, u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadU32LETrait } from '../../traits/methods/memory.read_u32_le.trait';

export abstract class MemoryReadU32LEImplementationUsingDataView implements MemoryReadU32LETrait {
  read_u32_le(this: MemoryPrivateDataViewTrait, address: MemoryAddress): u32 {
    return this[PRIVATE].dataView.getUint32(address, true);
  }
}
