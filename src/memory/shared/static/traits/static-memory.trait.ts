import { ReadonlyMemoryTrait } from '../../../read/readonly/traits/readonly-memory.trait';
import { WriteonlyMemoryTrait } from '../../../write/writeonly/traits/writeonly-memory.trait';

export interface StaticMemoryTrait extends ReadonlyMemoryTrait, WriteonlyMemoryTrait {}
