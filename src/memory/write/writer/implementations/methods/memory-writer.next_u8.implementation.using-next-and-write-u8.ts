import { SIZEOF_U8, u8 } from '@lifaon/math';
import { MemoryWriteU8Trait } from '../../../writeonly/traits/methods/memory.write_u8.trait';
import { MemoryWriterNextTrait } from '../../traits/methods/memory-writer.next.trait';
import { MemoryWriterNextU8Trait } from '../../traits/methods/memory-writer.next_u8.trait';

export abstract class MemoryWriterNextU8ImplementationUsingNextAndWriteU8
  implements MemoryWriterNextU8Trait
{
  next_u8(this: MemoryWriterNextTrait & MemoryWriteU8Trait, value: u8): void {
    return this.write_u8(this.next(SIZEOF_U8), value);
  }
}
