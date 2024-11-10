import { SIZEOF_U32, u32 } from '@lifaon/math';
import { MemoryWriteU32BETrait } from '../../../writeonly/traits/methods/memory.write_u32_be.trait';
import { MemoryWriterNextTrait } from '../../traits/methods/memory-writer.next.trait';
import { MemoryWriterNextU32BETrait } from '../../traits/methods/memory-writer.next_u32_be.trait';

export abstract class MemoryWriterNextU32BEImplementationUsingNextAndWriteU32BE
  implements MemoryWriterNextU32BETrait
{
  next_u32_be(this: MemoryWriterNextTrait & MemoryWriteU32BETrait, value: u32): void {
    return this.write_u32_be(this.next(SIZEOF_U32), value);
  }
}
