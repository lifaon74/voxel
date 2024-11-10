import { u32, u8 } from '@lifaon/math';
import { ReadonlyTexture3DTrait } from '../../../texture/texture-3d/traits/texture-3d.trait';
import { TextureColor } from '../../../texture/types/texture-color';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { RGBAVoxChunk } from '../chunks/rgba/rgba-vox-chunk';
import { RGBAVoxColor } from '../chunks/rgba/rgba-vox-color';
import { SizeVoxChunk } from '../chunks/size/size-vox-chunk';
import { XYZIVoxChunk } from '../chunks/xyzi/xyzi-vox-chunk';
import { XYZIVoxel } from '../chunks/xyzi/xyzi-voxel';

const NULL_COLOR: RGBAVoxColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
};

export function convert_main_vox_chunk_into_texture_3d(
  texture3d: ReadonlyTexture3DTrait,
): MainVoxChunk {
  const voxels: XYZIVoxel[] = [];
  const colors: RGBAVoxColor[] = [NULL_COLOR]; // palette[0] is always the "null" color

  const colorsMap: Map<u32 /* color */, u8 /* index */> = new Map<u32, u8>();

  for (let z: u32 = 0; z < texture3d.z; z++) {
    for (let y: u32 = 0; y < texture3d.y; y++) {
      for (let x: u32 = 0; x < texture3d.x; x++) {
        const [r, g, b, a]: TextureColor = texture3d.getColor(x, y, z);
        if (a !== 0) {
          const color: u32 = ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
          let i: u8 | undefined = colorsMap.get(color);

          if (i === undefined) {
            i = colors.length + 1;
            if (i >= 256) {
              throw new Error(
                'The texture contains more colors that the vox palette main contain.',
              );
            }
            colorsMap.set(color, i);
            colors.push({
              r,
              g,
              b,
              a,
            });
          }

          voxels.push({
            x,
            y,
            z,
            i,
          });
        }
      }
    }
  }

  while (colors.length < 256) {
    colors.push(NULL_COLOR);
  }

  return {
    type: 'main',
    children: [
      {
        type: 'size',
        x: texture3d.x,
        y: texture3d.y,
        z: texture3d.z,
      } satisfies SizeVoxChunk,
      {
        type: 'xyzi',
        voxels,
      } satisfies XYZIVoxChunk,
      {
        type: 'rgba',
        colors,
      } satisfies RGBAVoxChunk,
    ],
  };
}
