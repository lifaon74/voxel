import { char_string, usize } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryReadCharStringTrait } from '../../traits/methods/memory.read_char_string.trait';

export abstract class MemoryReadCharStringImplementationUsingDataView
  implements MemoryReadCharStringTrait
{
  read_char_string(
    this: MemoryPrivateDataViewTrait,
    address: MemoryAddress,
    length: usize,
  ): char_string {
    let str: string = '';
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(this[PRIVATE].dataView.getUint8(address + i));
    }
    return str;
  }
}
