import { MemoryCursorTrait } from '../../../shared/traits/properties/memory.cursor.trait';
import { WriteonlyMemoryTrait } from '../../writeonly/traits/writeonly-memory.trait';
import { MemoryWriterNextTrait } from './methods/memory-writer.next.trait';
import { MemoryWriterNextCharStringTrait } from './methods/memory-writer.next_char_string.trait';
import { MemoryWriterNextF32BETrait } from './methods/memory-writer.next_f32_be.trait';
import { MemoryWriterNextF32LETrait } from './methods/memory-writer.next_f32_le.trait';
import { MemoryWriterNextU32BETrait } from './methods/memory-writer.next_u32_be.trait';
import { MemoryWriterNextU32LETrait } from './methods/memory-writer.next_u32_le.trait';
import { MemoryWriterNextU8Trait } from './methods/memory-writer.next_u8.trait';

export interface MemoryWriterTrait
  extends WriteonlyMemoryTrait,
    MemoryCursorTrait,
    MemoryWriterNextTrait,
    MemoryWriterNextU8Trait,
    MemoryWriterNextU32LETrait,
    MemoryWriterNextU32BETrait,
    MemoryWriterNextF32LETrait,
    MemoryWriterNextF32BETrait,
    MemoryWriterNextCharStringTrait {}
