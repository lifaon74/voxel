import { ISetVoxelColorFunction } from '../voxel/generate/set-voxel-color-function.type';
import { ISetVoxelSizeFunction } from '../voxel/generate/set-voxel-size-function.type';
import {
  create_texture_3d_from_set_voxel_size_and_color_context,
} from '../voxel/texture-3d/create/create_texture_3d_from_set_voxel_size_and_color_context';
import { draw_texture_3d } from '../voxel/texture-3d/draw/draw-texture-3d';
import { Texture3D } from '../voxel/texture-3d/texture-3d.class';
import {
  decode_and_draw_vox_file_bytes_into_set_voxel_color_function,
} from '../voxel/vox-file/draw/decode_and_draw_vox_file_bytes_into_set_voxel_color_function';
import { import_vox_file_url_into_bytes } from '../voxel/vox-file/draw/import_vox_file_url_into_bytes';

// import vox from './samples/goxel-test.vox?raw'

/*----------*/

export function import_vox_file_url_to_texture_3d(
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

/*----------*/

/*----------*/

function debugTexture3d1() {
  const red = [255, 0, 0, 255];
  const green = [0, 255, 0, 255];
  const blue = [0, 0, 255, 255];

  const texture = new Texture3D(
    new Uint8ClampedArray([
      ...red, ...red,
      ...green, ...green,
      ...green, ...blue,
      ...green, ...red,
    ]),
    2, 2, 2,
  );

  draw_texture_3d(texture);
}

async function debugTexture3d2() {
  // const url = new URL('./samples/goxel-test2.vox?raw', import.meta.url);
  const url = new URL('./samples/alien_bot1.vox?raw', import.meta.url);
  const texture = await import_vox_file_url_to_texture_3d(url);
  draw_texture_3d(texture);
}

/*--------------------------*/

export async function debugTexture3d() {
  // debugTexture3d1();
  await debugTexture3d2();
}
