import { math_floor, u32, u8, vec3 } from '@lifaon/math';
import { Texture3DSetColorTrait } from '../../texture-3d/traits/methods/texture-3d.set-color.trait';
import { Texture3DSizeTrait } from '../../texture-3d/traits/properties/texture-3d.size.trait';

export function draw_uniform_cube_into_texture_3d(
  texture3d: Texture3DSizeTrait & Texture3DSetColorTrait,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
  side: u32 = Math.min(texture3d.x, texture3d.y, texture3d.z),
): void {
  for (let z: u32 = 0; z < side; z++) {
    for (let y: u32 = 0; y < side; y++) {
      for (let x: u32 = 0; x < side; x++) {
        texture3d.setColor(x, y, z, r, g, b, a);
      }
    }
  }
}
