import { draw_texture_3d } from '../voxel/texture-3d/draw/draw-texture-3d';
import { Texture3D } from '../voxel/texture-3d/texture-3d.class';
import { import_vox_file_url_into_texture_3d } from '../voxel/vox-file/draw/import_vox_file_url_into_texture_3d';

// import vox from './samples/goxel-test.vox?raw'

/*----------*/

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
  // const url = new URL('./samples/alien_bot1.vox?raw', import.meta.url);
  // const url = new URL('./samples/ephtracy/anim/horse.vox?raw', import.meta.url);
  const url = new URL('./samples/ephtracy/anim/T-Rex.vox?raw', import.meta.url);
  // const url = new URL('./samples/ephtracy/monument/monu1.vox?raw', import.meta.url);
  const texture = await import_vox_file_url_into_texture_3d(url);
  draw_texture_3d(texture, 4);
}

/*--------------------------*/

export async function debugTexture3d() {
  // debugTexture3d1();
  await debugTexture3d2();
}
