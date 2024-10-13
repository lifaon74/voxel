import { saveFile } from '../../../misc/save-file';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { encode_vox_file_as_bytes } from '../codec/encode_vox_file_as_bytes';

export function encode_and_save_vox_file(
  chunk: MainVoxChunk,
  options?: ShowSaveFilePickerOptions,
): Promise<void> {
  return saveFile(new Blob([encode_vox_file_as_bytes(chunk)]), options);
}
