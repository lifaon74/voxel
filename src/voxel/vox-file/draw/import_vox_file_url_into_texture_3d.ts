import { Texture3D } from '../../texture-3d/texture-3d.class';
import { import_vox_file_url_into_bytes } from './import_vox_file_url_into_bytes';
import {
  create_texture_3d_from_set_voxel_size_and_color_context,
} from '../../texture-3d/create/create_texture_3d_from_set_voxel_size_and_color_context';
import { ISetVoxelSizeFunction } from '../../generate/set-voxel-size-function.type';
import { ISetVoxelColorFunction } from '../../generate/set-voxel-color-function.type';
import {
  decode_and_draw_vox_file_bytes_into_set_voxel_color_function,
} from './decode_and_draw_vox_file_bytes_into_set_voxel_color_function';

export function import_vox_file_url_into_texture_3d(
  url: URL | string,
): Promise<Texture3D> {
  return import_vox_file_url_into_bytes(url)
    .then((bytes: Uint8Array): Texture3D => {
      return create_texture_3d_from_set_voxel_size_and_color_context((
        setVoxelSizeFunction: ISetVoxelSizeFunction,
        setVoxelColorFunction: ISetVoxelColorFunction,
      ): void => {
        decode_and_draw_vox_file_bytes_into_set_voxel_color_function(
          bytes,
          setVoxelSizeFunction,
          setVoxelColorFunction,
        );
      });
    });
}
