import { SIZEOF_U8, u8 } from '@lifaon/math';
import { MemoryReadU8Trait } from '../../../readonly/traits/methods/memory.read_u8.trait';
import { MemoryReaderNextTrait } from '../../traits/methods/memory-reader.next.trait';
import { MemoryReaderNextU8Trait } from '../../traits/methods/memory-reader.next_u8.trait';

export abstract class MemoryReaderNextU8ImplementationUsingNextAndReadU8
  implements MemoryReaderNextU8Trait
{
  next_u8(this: MemoryReaderNextTrait & MemoryReadU8Trait): u8 {
    return this.read_u8(this.next(SIZEOF_U8));
  }
}
