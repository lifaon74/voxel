import { StaticMemoryTrait } from '../../static/traits/static-memory.trait';
import { MemoryAllocTrait } from './methods/memory.alloc.trait';
import { MemoryFreeTrait } from './methods/memory.free.trait';

export interface DynamicMemoryTrait extends StaticMemoryTrait, MemoryAllocTrait, MemoryFreeTrait {}
