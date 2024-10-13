import { MainVoxChunk } from '../../chunks/main/main-vox-chunk';
import { decode_vox_file_from_bytes } from '../../codec/decode_vox_file_from_bytes';
import { load_vox_file_as_uint8_array } from './load_vox_file_as_uint8_array';

export async function load_vox_file_as_vox_chunk(url: URL | string): Promise<MainVoxChunk> {
  return decode_vox_file_from_bytes(await load_vox_file_as_uint8_array(url));
}
