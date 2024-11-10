import { MemoryBytesTrait } from '../../../shared/traits/properties/memory.bytes.trait';
import { MemoryWriteCharStringTrait } from './methods/memory.write_char_string.trait';
import { MemoryWriteF32BETrait } from './methods/memory.write_f32_be.trait';
import { MemoryWriteU32BETrait } from './methods/memory.write_u32_be.trait';
import { MemoryWriteU8Trait } from './methods/memory.write_u8.trait';

export interface WriteonlyMemoryTrait
  extends MemoryBytesTrait,
    MemoryWriteU8Trait,
    MemoryWriteU32BETrait,
    MemoryWriteF32BETrait,
    MemoryWriteCharStringTrait {}
