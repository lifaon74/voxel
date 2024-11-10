import { SIZEOF_U32, u32 } from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../../readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReaderNextTrait } from '../../traits/methods/memory-reader.next.trait';
import { MemoryReaderNextU32BETrait } from '../../traits/methods/memory-reader.next_u32_be.trait';

export abstract class MemoryReaderNextU32BEImplementationUsingNextAndReadU32BE
  implements MemoryReaderNextU32BETrait
{
  next_u32_be(this: MemoryReaderNextTrait & MemoryReadU32BETrait): u32 {
    return this.read_u32_be(this.next(SIZEOF_U32));
  }
}
