import { u32 } from '@lifaon/math';

export function read_u32_be_from_uint8_array(
  array: Uint8Array,
  index: u32,
): u32 {
  return (
    (array[index])
    | (array[index + 1] << 8)
    | (array[index + 2] << 16)
    | (array[index + 3] << 24)
  ) >>> 0;
}
