import { SaveFileOptions } from '../../../../misc/save-file';
import { ReadonlyTexture3DTrait } from '../../../../texture/texture-3d/traits/texture-3d.trait';
import { convert_main_vox_chunk_into_texture_3d } from '../../texture-3d/convert_texture_3d_into_main_vox_chunk';
import { save_vox_chunk_as_vox_file } from './save_vox_chunk_as_vox_file';

export function save_texture_3d_as_vox_file(
  texture3d: ReadonlyTexture3DTrait,
  options?: SaveFileOptions,
): Promise<void> {
  return save_vox_chunk_as_vox_file(convert_main_vox_chunk_into_texture_3d(texture3d), options);
}
