import { char_string, usize } from '@lifaon/math';
import { PRIVATE } from '@lifaon/traits';
import { MemoryAddress } from '../../../../shared/memory-address';
import { MemoryPrivateDataViewTrait } from '../../../../shared/traits/properties/memory.private-data-view.trait';
import { MemoryWriteCharStringTrait } from '../../traits/methods/memory.write_char_string.trait';

export abstract class MemoryWriteCharStringImplementationUsingDataView
  implements MemoryWriteCharStringTrait
{
  write_char_string(
    this: MemoryPrivateDataViewTrait,
    address: MemoryAddress,
    value: char_string,
  ): void {
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      if (charCode <= 0xff) {
        this[PRIVATE].dataView.setUint8(address + i, charCode);
      } else {
        throw new Error(`Not a char string: at index ${i} found char code ${charCode}`);
      }
    }
  }
}
