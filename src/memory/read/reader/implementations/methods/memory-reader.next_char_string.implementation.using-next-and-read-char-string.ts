import { char_string, usize } from '@lifaon/math';
import { MemoryReadCharStringTrait } from '../../../readonly/traits/methods/memory.read_char_string.trait';
import { MemoryReaderNextTrait } from '../../traits/methods/memory-reader.next.trait';
import { MemoryReaderNextCharStringTrait } from '../../traits/methods/memory-reader.next_char_string.trait';

export abstract class MemoryReaderNextU8ImplementationUsingNextAndCharString
  implements MemoryReaderNextCharStringTrait
{
  next_char_string(
    this: MemoryReaderNextTrait & MemoryReadCharStringTrait,
    length: usize,
  ): char_string {
    return this.read_char_string(this.next(length), length);
  }
}
