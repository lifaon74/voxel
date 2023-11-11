import { IVoxelOctreeIn3dSpace } from '../../objects/voxel-octree/voxel-octree-in-3d-space.type';
import { IRadialLightIn3dSpace } from '../../objects/light/radial-light-in-3d-space.type';
import { IReadonlyLightSpectrum } from '../../objects/light/light-spectrum.type';
import { vec3, vec3_from_values, u16, vec4, vec4_create, u32 } from '@lifaon/math';
import {
  get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights,
} from './get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights';

export function render_voxel_octrees_and_lights_in_image_data_using_cpu(
  imageData: ImageData,
  voxelOctreesIn3dSpace: readonly IVoxelOctreeIn3dSpace[],
  lightsIn3dSpace: readonly IRadialLightIn3dSpace[],
  ambientLightSpectrum: IReadonlyLightSpectrum,
): ImageData {
  const rayStartPointInNDCSpace: vec3 = vec3_from_values(0, 0, 0);
  const rayEndPointInNDCSpace: vec3 = vec3_from_values(0, 0, 1);

  const width: u16 = imageData.width;
  const widthM1: u16 = width - 1;
  const height: u16 = imageData.height;
  const heightM1: u16 = height - 1;

  const color: vec4 = vec4_create();

  let i: u32 = 0;
  for (let y: u16 = 0; y < height; y++) {
    rayStartPointInNDCSpace[1] = rayEndPointInNDCSpace[1] = -(((2 * y) - heightM1) / height); // negate because y axis of Image data is opposite of viewport

    for (let x: u16 = 0; x < width; x++) {
      rayStartPointInNDCSpace[0] = rayEndPointInNDCSpace[0] = ((2 * x) - widthM1) / width;

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
