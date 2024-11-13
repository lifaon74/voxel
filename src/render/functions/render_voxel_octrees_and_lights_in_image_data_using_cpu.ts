import { u16, u32, vec3, vec3_from_values, vec4, vec4_create } from '@lifaon/math';
import { RadialLightIn3dSpaceTrait } from '../../scene/traits/light/radial-light-in-3d-space.trait';
import { ReadonlyLightSpectrum } from '../../scene/traits/light/types/light-spectrum';
import { VoxelOctreeIn3dSpaceTrait } from '../../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights } from './get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights';

export function render_voxel_octrees_and_lights_in_image_data_using_cpu(
  colorBuffer: Float32Array, // rgb
  lightBuffer: Float32Array, // rgb
  hitBuffer: Float32Array, // xyz
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[],
  ambientLightSpectrum: ReadonlyLightSpectrum,
): void {
  const rayStartPointInNDCSpace: vec3 = vec3_from_values(0, 0, 0);
  const rayEndPointInNDCSpace: vec3 = vec3_from_values(0, 0, 1);

  const width: u16 = imageData.width;
  const widthM1: u16 = width - 1;
  const height: u16 = imageData.height;
  const heightM1: u16 = height - 1;

  const color: vec4 = vec4_create();

  let i: u32 = 0;
  for (let y: u16 = 0; y < height; y++) {
    rayStartPointInNDCSpace[1] = rayEndPointInNDCSpace[1] = -((2 * y - heightM1) / height); // negate because y axis of Image data is opposite of viewport

    for (let x: u16 = 0; x < width; x++) {
      rayStartPointInNDCSpace[0] = rayEndPointInNDCSpace[0] = (2 * x - widthM1) / width;

      get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights(
        color,
        voxelOctreesIn3dSpace,
        lightsIn3dSpace,
        ambientLightSpectrum,
        rayStartPointInNDCSpace,
        rayEndPointInNDCSpace,
      );

      imageData.data[i++] = color[0] * 255;
      imageData.data[i++] = color[1] * 255;
      imageData.data[i++] = color[2] * 255;
      imageData.data[i++] = color[3] * 255;
    }
  }

  return imageData;
}
