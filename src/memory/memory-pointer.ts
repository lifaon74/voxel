import { IMemoryAddress } from './memory-address.type';
import { IMemory } from './memory.type';

export interface IMemoryPointer {
  memory: IMemory,
  address: IMemoryAddress;
}

export function createMemoryPointer(
  memory: IMemory,
  address: IMemoryAddress,
): IMemoryPointer {
  return {
    memory,
    address,
  };
}
