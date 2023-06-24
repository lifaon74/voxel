import { u32 } from '@lifaon/number-types';
import { IMemoryAddress } from './memory-address.type';

export interface IAllocFunction {
  (
    size: u32
  ): IMemoryAddress;
}
