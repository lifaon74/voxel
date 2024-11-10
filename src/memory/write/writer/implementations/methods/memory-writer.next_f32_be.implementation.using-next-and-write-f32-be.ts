import { SIZEOF_F32, f32 } from '@lifaon/math';
import { MemoryWriteF32BETrait } from '../../../writeonly/traits/methods/memory.write_f32_be.trait';
import { MemoryWriterNextTrait } from '../../traits/methods/memory-writer.next.trait';
import { MemoryWriterNextF32BETrait } from '../../traits/methods/memory-writer.next_f32_be.trait';

export abstract class MemoryWriterNextF32BEImplementationUsingNextAndWriteF32BE
  implements MemoryWriterNextF32BETrait
{
  next_f32_be(this: MemoryWriterNextTrait & MemoryWriteF32BETrait, value: f32): void {
    return this.write_f32_be(this.next(SIZEOF_F32), value);
  }
}
