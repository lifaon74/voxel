import { u32, u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteU32LETrait } from '../../traits/methods/memory.write_u32_le.trait';

export abstract class MemoryWriteU32LEImplementationUsingDataView implements MemoryWriteU32LETrait {
  write_u32_le(this: MemoryPrivateDataViewTrait, address: MemoryAddress, value: u32): void {
    return this[PRIVATE].dataView.setUint32(address, value, true);
  }
}
