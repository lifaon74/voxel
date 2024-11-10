import { char_string } from '@lifaon/math';
import { MemoryWriteCharStringTrait } from '../../../writeonly/traits/methods/memory.write_char_string.trait';
import { MemoryWriterNextTrait } from '../../traits/methods/memory-writer.next.trait';
import { MemoryWriterNextCharStringTrait } from '../../traits/methods/memory-writer.next_char_string.trait';

export abstract class MemoryWriterNextU8ImplementationUsingNextAndCharString
  implements MemoryWriterNextCharStringTrait
{
  next_char_string(
    this: MemoryWriterNextTrait & MemoryWriteCharStringTrait,
    value: char_string,
  ): void {
    return this.write_char_string(this.next(value.length), value);
  }
}
