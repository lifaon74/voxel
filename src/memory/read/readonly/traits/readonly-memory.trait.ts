import { MemoryBytesTrait } from '../../../shared/traits/properties/memory.bytes.trait';
import { MemoryReadCharStringTrait } from './methods/memory.read_char_string.trait';
import { MemoryReadF32BETrait } from './methods/memory.read_f32_be.trait';
import { MemoryReadF32LETrait } from './methods/memory.read_f32_le.trait';
import { MemoryReadU32BETrait } from './methods/memory.read_u32_be.trait';
import { MemoryReadU32LETrait } from './methods/memory.read_u32_le.trait';
import { MemoryReadU8Trait } from './methods/memory.read_u8.trait';

export interface ReadonlyMemoryTrait
  extends MemoryBytesTrait,
    MemoryReadU8Trait,
    MemoryReadU32LETrait,
    MemoryReadU32BETrait,
    MemoryReadF32LETrait,
    MemoryReadF32BETrait,
    MemoryReadCharStringTrait {}
