import { f32, u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadF32LETrait } from '../../traits/methods/memory.read_f32_le.trait';
import { MemoryReadU8Trait } from '../../traits/methods/memory.read_u8.trait';

export abstract class MemoryReadF32LEImplementationUsingDataView implements MemoryReadF32LETrait {
  read_f32_le(this: MemoryPrivateDataViewTrait, address: MemoryAddress): f32 {
    return this[PRIVATE].dataView.getFloat32(address, true);
  }
}
