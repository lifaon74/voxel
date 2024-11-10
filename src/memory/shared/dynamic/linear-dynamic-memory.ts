import { usize } from '@lifaon/math';
import { MemoryAddress } from '../memory-address';
import { StaticMemory } from '../static/static-memory';
import { DynamicMemoryTrait } from './traits/dynamic-memory.trait';

export class LinearDynamicMemory extends StaticMemory implements DynamicMemoryTrait {
  #cursor: number = 0;

  alloc(size: usize): MemoryAddress {
    if (size === 0) {
      return this.#cursor;
    } else {
      const index: number = this.#cursor;
      this.#cursor += size;
      if (this.#cursor > this.bytes.byteLength) {
        throw new Error('Alloc failed: not enough bytes.');
      }
      return index;
    }
  }

  free(address: MemoryAddress): void {
    // noop
  }

  print(): void {
    console.log(this.bytes.slice(0, this.#cursor));
  }
}
