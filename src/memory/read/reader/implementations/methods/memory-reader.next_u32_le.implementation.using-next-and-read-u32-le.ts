import { SIZEOF_U32, u32 } from '@lifaon/math';
import { MemoryReadU32LETrait } from '../../../readonly/traits/methods/memory.read_u32_le.trait';
import { MemoryReaderNextTrait } from '../../traits/methods/memory-reader.next.trait';
import { MemoryReaderNextU32LETrait } from '../../traits/methods/memory-reader.next_u32_le.trait';

export abstract class MemoryReaderNextU32LEImplementationUsingNextAndReadU32LE
  implements MemoryReaderNextU32LETrait
{
  next_u32_le(this: MemoryReaderNextTrait & MemoryReadU32LETrait): u32 {
    return this.read_u32_le(this.next(SIZEOF_U32));
  }
}
