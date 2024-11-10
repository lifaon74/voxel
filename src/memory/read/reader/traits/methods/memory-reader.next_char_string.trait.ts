import { char_string, usize } from '@lifaon/math';

export interface MemoryReaderNextCharStringTrait {
  next_char_string(length: usize): char_string;
}
