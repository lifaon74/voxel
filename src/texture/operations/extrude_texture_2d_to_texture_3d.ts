import { u32, u8 } from '@lifaon/math';
import { ReadonlyTexture2DTrait } from '../texture-2d/traits/texture-2d.trait';
import { Texture3DFactoryCreateTrait } from '../texture-3d/factory/traits/methods/texture-3d-factory.create.trait';
import { Texture3DSetColorTrait } from '../texture-3d/traits/methods/texture-3d.set-color.trait';
import { TextureColor } from '../types/texture-color';

/**
 * topTexture2d: x (left->right), y (back->front)
 * Texture3D: x (left->right), y (front->back), z (bottom->top)
 */
export function extrude_texture_2d_to_texture_3d<GTexture3D extends Texture3DSetColorTrait>(
  topTexture2d: ReadonlyTexture2DTrait,
  z: u32,
  factory: Texture3DFactoryCreateTrait<GTexture3D>,
): GTexture3D {
  const texture3d: GTexture3D = factory.create(topTexture2d.x, topTexture2d.y, z);

  for (let t2dy: u32 = 0; t2dy < topTexture2d.y; t2dy++) {
    for (let t2dx: u32 = 0; t2dx < topTexture2d.x; t2dx++) {
      const [r, g, b, a]: TextureColor = topTexture2d.getColor(t2dx, t2dy);
      for (let t3dz: u32 = 0; t3dz < z; t3dz++) {
        texture3d.setColor(t2dx, topTexture2d.y - t2dy, t3dz, r, g, b, a);
      }
    }
  }

  return texture3d;
}
