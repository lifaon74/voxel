import { u32 } from '@lifaon/math';
import { IMemoryAddress } from './memory-address.type';

export interface IMemoryAllocFunction {
  (
    size: u32, // the size to alloc
  ): IMemoryAddress; // the address of the allocated memory portion
}
