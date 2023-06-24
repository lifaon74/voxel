import { u32 } from '@lifaon/number-types';
import { IMemoryAllocator } from '../memory-allocator';

export function memoryAllocatorLog(
  memoryAllocator: IMemoryAllocator,
  message: string,
): void {
  console.log(message, memoryAllocatorToSmallestUint8Array(memoryAllocator));
}

export function memoryAllocatorToUint8Array(
  {
    getBuffer,
  }: IMemoryAllocator,
  byteOffset: u32 = 0,
  byteLength: u32 = getBuffer().byteLength,
): Uint8Array {
  return new Uint8Array(getBuffer(), byteOffset, byteLength);
}

export function memoryAllocatorToSmallestUint8Array(
  memoryAllocator: IMemoryAllocator,
  byteOffset: u32 = 0,
): Uint8Array {
  return memoryAllocatorToUint8Array(memoryAllocator, byteOffset, memoryAllocator.getSize());
}
