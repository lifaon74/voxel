import { SIZEOF_F32, f32 } from '@lifaon/math';
import { MemoryReadF32LETrait } from '../../../readonly/traits/methods/memory.read_f32_le.trait';
import { MemoryReaderNextTrait } from '../../traits/methods/memory-reader.next.trait';
import { MemoryReaderNextF32LETrait } from '../../traits/methods/memory-reader.next_f32_le.trait';

export abstract class MemoryReaderNextF32LEImplementationUsingNextAndReadF32LE
  implements MemoryReaderNextF32LETrait
{
  next_f32_le(this: MemoryReaderNextTrait & MemoryReadF32LETrait): f32 {
    return this.read_f32_le(this.next(SIZEOF_F32));
  }
}
