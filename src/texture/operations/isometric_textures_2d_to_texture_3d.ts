import { u32, u8 } from '@lifaon/math';
import { ReadonlyTexture2DTrait } from '../texture-2d/traits/texture-2d.trait';
import { Texture3DFactoryCreateTrait } from '../texture-3d/factory/traits/methods/texture-3d-factory.create.trait';
import { Texture3DSetColorTrait } from '../texture-3d/traits/methods/texture-3d.set-color.trait';
import { TextureColor } from '../types/texture-color';

/**
 * topTexture2d: x (left->right), y (back->front)
 * frontTexture2d: x (left->right), y (top->bottom)
 * Texture3D: x (left->right), y (front->back), z (bottom->top)
 */
export function isometric_textures_2d_to_texture_3d<GTexture3D extends Texture3DSetColorTrait>(
  topTexture2d: ReadonlyTexture2DTrait,
  frontTexture2d: ReadonlyTexture2DTrait,
  factory: Texture3DFactoryCreateTrait<GTexture3D>,
): GTexture3D {
  if (topTexture2d.x !== frontTexture2d.x) {
    throw new Error('Top and front texture 2d should have the same x.');
  }

  if (topTexture2d.y !== frontTexture2d.y) {
    throw new Error('Top and front texture 2d should have the same y.');
  }

  const sx: u32 = topTexture2d.x;
  const sy: u32 = topTexture2d.y;
  const sz: u32 = frontTexture2d.y;

  const texture3d: GTexture3D = factory.create(sx, sy, sz);

  const v1: u32 = topTexture2d.y - 1 + sz; /* - 1 */

  // top
  for (let t2dy: u32 = 1; t2dy < topTexture2d.y; t2dy++) {
    const v2: u32 = v1 - t2dy;
    for (let t2dx: u32 = 0; t2dx < topTexture2d.x; t2dx++) {
      const [r, g, b, a]: TextureColor = topTexture2d.getColor(t2dx, t2dy);
      for (let t3dz: u32 = sz - t2dy; t3dz < sz; t3dz++) {
        const t3dy: u32 = v2 - t3dz;
        texture3d.setColor(t2dx, t3dy, t3dz, r, g, b, a);
      }
    }
  }

  // front
  for (let t2dy: u32 = 0; t2dy < frontTexture2d.y; t2dy++) {
    const v3: u32 = frontTexture2d.y - t2dy;
    const v4: u32 = v3 - 1;
    for (let t2dx: u32 = 0; t2dx < frontTexture2d.x; t2dx++) {
      const [r, g, b, a]: TextureColor = frontTexture2d.getColor(t2dx, t2dy);
      for (let t3dy: u32 = 0; t3dy < v3; t3dy++) {
        const t3dz: u32 = v4 - t3dy;
        texture3d.setColor(t2dx, t3dy, t3dz, r, g, b, a);
      }
    }
  }

  return texture3d;
}
