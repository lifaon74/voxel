import { char_string, u8, usize } from '@lifaon/math';
import { MemoryAddress } from '../../../../shared/memory-address';

export interface MemoryReadCharStringTrait {
  read_char_string(address: MemoryAddress, length: usize): char_string;
}
