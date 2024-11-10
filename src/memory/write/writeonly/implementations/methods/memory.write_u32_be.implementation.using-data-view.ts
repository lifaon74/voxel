import { u32 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteU32BETrait } from '../../traits/methods/memory.write_u32_be.trait';

export abstract class MemoryWriteU32BEImplementationUsingDataView implements MemoryWriteU32BETrait {
  write_u32_be(this: MemoryPrivateDataViewTrait, address: MemoryAddress, value: u32): void {
    return this[PRIVATE].dataView.setUint32(address, value, false);
  }
}
