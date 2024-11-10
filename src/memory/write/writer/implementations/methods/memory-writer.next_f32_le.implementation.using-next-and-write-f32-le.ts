import { SIZEOF_F32, f32 } from '@lifaon/math';
import { MemoryWriteF32LETrait } from '../../../writeonly/traits/methods/memory.write_f32_le.trait';
import { MemoryWriterNextTrait } from '../../traits/methods/memory-writer.next.trait';
import { MemoryWriterNextF32LETrait } from '../../traits/methods/memory-writer.next_f32_le.trait';

export abstract class MemoryWriterNextF32LEImplementationUsingNextAndWriteF32LE
  implements MemoryWriterNextF32LETrait
{
  next_f32_le(this: MemoryWriterNextTrait & MemoryWriteF32LETrait, value: f32): void {
    return this.write_f32_le(this.next(SIZEOF_F32), value);
  }
}
