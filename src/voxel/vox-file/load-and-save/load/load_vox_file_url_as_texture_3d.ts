import { ISetVoxelColorFunction } from '../../../generate/set-voxel-color-function.type';
import { ISetVoxelSizeFunction } from '../../../generate/set-voxel-size-function.type';
import { create_texture_3d_from_set_voxel_size_and_color_context } from '../../../texture-3d/create/create_texture_3d_from_set_voxel_size_and_color_context';
import { Texture3D } from '../../../texture-3d/texture-3d.class';
import { MainVoxChunk } from '../../chunks/main/main-vox-chunk';
import { draw_main_vox_chunk_into_set_voxel_color_function } from '../../draw/draw_main_vox_chunk_into_set_voxel_color_function';
import { load_vox_file_as_vox_chunk } from './load_vox_file_as_vox_chunk';

export async function load_vox_file_url_as_texture_3d(url: URL | string): Promise<Texture3D> {
  const chunk: MainVoxChunk = await load_vox_file_as_vox_chunk(url);
  return create_texture_3d_from_set_voxel_size_and_color_context(
    (
      setVoxelSizeFunction: ISetVoxelSizeFunction,
      setVoxelColorFunction: ISetVoxelColorFunction,
    ): void => {
      draw_main_vox_chunk_into_set_voxel_color_function(
        chunk,
        setVoxelSizeFunction,
        setVoxelColorFunction,
      );
    },
  );
}
