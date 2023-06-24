import { u32 } from '@lifaon/number-types';
import { IAllocFunction } from './alloc-function.type';
import { IMemoryAddress } from './memory-address.type';


export interface IMemoryAllocatorGetAllocatedSize {
  (): u32;
}


export interface IMemoryAllocatorGetBuffer {
  (): ArrayBuffer;
}

export interface IMemoryAllocator {
  getBuffer: IMemoryAllocatorGetBuffer;
  getSize: IMemoryAllocatorGetAllocatedSize;
  alloc: IAllocFunction;
}

export function createMemoryAllocator(
  sizeOrBuffer: number /* size */ | ArrayBuffer /* buffer */,
): IMemoryAllocator {
  let writeIndex: u32 = 0;

  const buffer: ArrayBuffer = (typeof sizeOrBuffer === 'number')
    ? new ArrayBuffer(sizeOrBuffer)
    : sizeOrBuffer;

  const getBuffer = (): ArrayBuffer => {
    return buffer;
  };

  const getSize = (): u32 => {
    return writeIndex;
  };

  const alloc = (
    size: u32
  ): IMemoryAddress => {
    const index: number = writeIndex;
    writeIndex += size;
    if (writeIndex > buffer.byteLength) {
      throw new Error(`Alloc failed: not enough memory`);
    }
    return index;
  };

  return {
    getBuffer,
    getSize,
    alloc,
  };
}
