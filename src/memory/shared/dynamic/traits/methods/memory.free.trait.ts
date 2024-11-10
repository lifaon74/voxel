import { MemoryAddress } from '../../../memory-address';

export interface MemoryFreeTrait {
  free(address: MemoryAddress): void;
}
