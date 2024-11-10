import { SIZEOF_U32, u32 } from '@lifaon/math';
import { MemoryWriteU32LETrait } from '../../../writeonly/traits/methods/memory.write_u32_le.trait';
import { MemoryWriterNextTrait } from '../../traits/methods/memory-writer.next.trait';
import { MemoryWriterNextU32LETrait } from '../../traits/methods/memory-writer.next_u32_le.trait';

export abstract class MemoryWriterNextU32LEImplementationUsingNextAndWriteU32LE
  implements MemoryWriterNextU32LETrait
{
  next_u32_le(this: MemoryWriterNextTrait & MemoryWriteU32LETrait, value: u32): void {
    return this.write_u32_le(this.next(SIZEOF_U32), value);
  }
}
