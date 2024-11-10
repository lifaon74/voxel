import { char_string, u8, usize } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryWriteCharStringTrait {
  write_char_string(address: MemoryAddress, value: char_string): void;
}
