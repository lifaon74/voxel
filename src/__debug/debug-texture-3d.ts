import { u32 } from '@lifaon/math';
import { RGBAVoxColor } from '../formats/vox-file/chunks/rgba/rgba-vox-color';
import { load_vox_file_url_as_texture_3d } from '../formats/vox-file/load-and-save/load/load_vox_file_url_as_texture_3d';
import { save_texture_3d_as_vox_file } from '../formats/vox-file/load-and-save/save/save_texture_3d_as_vox_file';
import { DEFAULT_VOX_PALETTE } from '../formats/vox-file/palette/default-vox-palette.constant';
import { draw_image_data } from '../image/canvas/draw_image_data';
import { extrude_texture_2d_to_texture_3d } from '../texture/operations/extrude_texture_2d_to_texture_3d';
import { isometric_textures_2d_to_texture_3d } from '../texture/operations/isometric_textures_2d_to_texture_3d';
import { save_texture_2d_as_png } from '../texture/texture-2d/operations/save_texture_2d_as_png';
import { Texture2D } from '../texture/texture-2d/texture-2d';
import { ColorPalette } from '../texture/texture-2d/traits/methods/texture-2d.apply-palette.trait';
import { Texture3D } from '../texture/texture-3d/texture-3d';
import { Texture3DSetColorTrait } from '../texture/texture-3d/traits/methods/texture-3d.set-color.trait';
import { VoxelOctree } from '../voxel/texture-3d/voxel-octree';

// import vox from './samples/goxel-test.vox?raw'

/*----------*/

export class WorldMap {
  readonly #map: Map<u32, Map<u32, Map<u32, WorldBlock>>> = new Map<
    u32,
    Map<u32, Map<u32, WorldBlock>>
  >();

  get(x: u32, y: u32, z: u32): WorldBlock | undefined {
    return this.#map.get(x)?.get(y)?.get(z);
  }

  set(x: u32, y: u32, z: u32, worldBlock: WorldBlock): void {
    throw 'TODO';
  }
}

export abstract class WorldBlock {
  abstract readonly id: u32;

  /**
   * Renders this block at position (x, y, z) on `worldMap`, into `texture3D`.
   */
  abstract build(
    x: u32,
    y: u32,
    z: u32,
    worldMap: WorldMap,
    texture3D: Texture3DSetColorTrait,
  ): void;
}

/*----------*/

/*----------*/

function debugTexture3d_01() {
  const red = [255, 0, 0, 255];
  const green = [0, 255, 0, 255];
  const blue = [0, 0, 255, 255];

  const texture = new Texture3D(
    2,
    2,
    2,
    new Uint8ClampedArray([
      ...red,
      ...red,
      ...green,
      ...green,
      ...green,
      ...blue,
      ...green,
      ...red,
    ]),
  );

  draw_image_data(texture.toImageData());
}

function createSaveButton(onSave: (event: MouseEvent) => void): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.innerText = 'Save';
  button.style.color = '#333';
  button.style.fontSize = '18px';
  button.style.border = '1px solid #666';
  button.style.backgroundColor = '#fafafa';
  button.style.padding = '8px 12px';
  button.style.borderRadius = '4px';
  button.addEventListener('click', onSave);
  return button;
}

async function debugTexture3d_02() {
  // const url = new URL('./samples/goxel-test2.vox?raw', import.meta.url);
  const url = new URL('../../assets/vox/alien_bot1.vox?raw', import.meta.url);
  // const url = new URL('./samples/ephtracy/anim/horse.vox?raw', import.meta.url);
  // const url = new URL('../../assets/vox/ephtracy/anim/T-Rex.vox?raw', import.meta.url);
  // const url = new URL('./samples/ephtracy/monument/monu1.vox?raw', import.meta.url);
  const texture = await load_vox_file_url_as_texture_3d(url, Texture3D);
  // const texture = await load_vox_file_url_as_texture_3d(url, VoxelOctree);
  console.log(texture);
  draw_image_data(texture.toImageData(), 4);

  window.onclick = async () => {
    await save_texture_3d_as_vox_file(texture, {
      startIn: 'downloads',
      suggestedName: 'demo.vox',
    });
  };
}

async function debugTexture3d_03() {
  const url = new URL('../../assets/tilesets/originals/04.png?raw', import.meta.url);
  // const url = new URL('../../assets/tilesets/templates/floors/pavers_06.png?raw', import.meta.url);
  const texture2d: Texture2D = await Texture2D.fromUrl(url);

  // const top = texture2d.crop(32 * 2, 32 * 11, 64, 64);
  // const bottom = texture2d.crop(32 * 2, 32 * 13, 64, 64);

  // const top = texture2d.crop(32 * 2, 32 * 11, 4, 4);
  // const bottom = texture2d.crop(32 * 2, 32 * 13, 4, 4);

  const top = texture2d.crop(64 * 5, 32 * 1, 64, 64);
  const bottom = texture2d.crop(64 * 5, 32 * 3, 64, 64);

  // const vox = isometric_textures_2d_to_texture_3d(top, bottom, Texture3D);
  const vox = extrude_texture_2d_to_texture_3d(bottom, 64, Texture3D);
  // draw_image_data(top.toImageData());
  // draw_image_data(bottom.toImageData());
  // draw_image_data(vox.toImageData(), 2);

  const button = createSaveButton(async () => {
    await save_texture_3d_as_vox_file(vox, {
      startIn: 'downloads',
      suggestedName: 'demo.vox',
    });
  });

  document.body.appendChild(button);
}

async function debugTexture3d_04() {
  const palette: ColorPalette = DEFAULT_VOX_PALETTE.flatMap(
    ({ r, g, b }: RGBAVoxColor): number[] => [r, g, b],
  );

  const url = new URL('../../assets/tilesets/templates/floors/pavers_06.png?raw', import.meta.url);
  const texture2d: Texture2D = await Texture2D.fromUrl(url);
  texture2d.reduceColorDepth(6);
  // texture2d.applyPalette(palette);

  const texture3d = extrude_texture_2d_to_texture_3d(texture2d, 32, Texture3D);

  const button = createSaveButton(async () => {
    await save_texture_3d_as_vox_file(texture3d, {
      startIn: 'downloads',
      suggestedName: 'demo.vox',
    });
  });

  document.body.appendChild(button);
}

async function debugTexture3d_05() {
  const url = new URL(
    '../../assets/tilesets/16x16/d36bih3-7bd0f401-eaaa-493a-b102-e5abbcb3bc67.png?raw',
    import.meta.url,
  );
  const texture2d: Texture2D = await Texture2D.fromUrl(url);

  const base_size: u32 = 16;

  const tile = texture2d.crop(5 * base_size, 21 * base_size, base_size, base_size);
  draw_image_data(tile.toImageData(), 4);

  const top = tile.crop(0, 0, base_size, base_size / 2).scale(base_size, base_size);
  draw_image_data(top.toImageData(), 4);
  const bottom = tile.crop(0, base_size / 2, base_size, base_size / 2).scale(base_size, base_size);
  draw_image_data(bottom.toImageData(), 4);

  const vox = isometric_textures_2d_to_texture_3d(top, bottom, Texture3D);

  const button = createSaveButton(async () => {
    // await save_texture_3d_as_vox_file(vox, {
    //   startIn: 'downloads',
    //   suggestedName: 'demo.vox',
    // });
    await save_texture_2d_as_png(tile, {
      startIn: 'downloads',
      suggestedName: 'demo.png',
    });
  });

  document.body.appendChild(button);
}

/*--------------------------*/

export async function debugTexture3d() {
  // debugTexture3d1();
  // await debugTexture3d_02();
  // await debugTexture3d_03();
  // await debugTexture3d_04();
  await debugTexture3d_05();
}
