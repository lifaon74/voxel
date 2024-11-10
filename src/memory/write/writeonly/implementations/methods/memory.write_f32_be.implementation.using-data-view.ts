import { f32, u8 } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteF32BETrait } from '../../traits/methods/memory.write_f32_be.trait';
import { MemoryWriteU8Trait } from '../../traits/methods/memory.write_u8.trait';

export abstract class MemoryWriteF32BEImplementationUsingDataView implements MemoryWriteF32BETrait {
  write_f32_be(this: MemoryPrivateDataViewTrait, address: MemoryAddress, value: f32): void {
    return this[PRIVATE].dataView.setFloat32(address, value, false);
  }
}
