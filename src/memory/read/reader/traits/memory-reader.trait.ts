import { MemoryCursorTrait } from '../../../shared/traits/properties/memory.cursor.trait';
import { ReadonlyMemoryTrait } from '../../readonly/traits/readonly-memory.trait';
import { MemoryReaderNextTrait } from './methods/memory-reader.next.trait';
import { MemoryReaderNextCharStringTrait } from './methods/memory-reader.next_char_string.trait';
import { MemoryReaderNextF32BETrait } from './methods/memory-reader.next_f32_be.trait';
import { MemoryReaderNextF32LETrait } from './methods/memory-reader.next_f32_le.trait';
import { MemoryReaderNextU32BETrait } from './methods/memory-reader.next_u32_be.trait';
import { MemoryReaderNextU32LETrait } from './methods/memory-reader.next_u32_le.trait';
import { MemoryReaderNextU8Trait } from './methods/memory-reader.next_u8.trait';

export interface MemoryReaderTrait
  extends ReadonlyMemoryTrait,
    MemoryCursorTrait,
    MemoryReaderNextTrait,
    MemoryReaderNextU8Trait,
    MemoryReaderNextU32LETrait,
    MemoryReaderNextU32BETrait,
    MemoryReaderNextF32LETrait,
    MemoryReaderNextF32BETrait,
    MemoryReaderNextCharStringTrait {}
