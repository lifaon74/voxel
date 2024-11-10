import { SIZEOF_F32, f32 } from '@lifaon/math';
import { MemoryReadF32BETrait } from '../../../readonly/traits/methods/memory.read_f32_be.trait';
import { MemoryReaderNextTrait } from '../../traits/methods/memory-reader.next.trait';
import { MemoryReaderNextF32BETrait } from '../../traits/methods/memory-reader.next_f32_be.trait';

export abstract class MemoryReaderNextF32BEImplementationUsingNextAndReadF32BE
  implements MemoryReaderNextF32BETrait
{
  next_f32_be(this: MemoryReaderNextTrait & MemoryReadF32BETrait): f32 {
    return this.read_f32_be(this.next(SIZEOF_F32));
  }
}
