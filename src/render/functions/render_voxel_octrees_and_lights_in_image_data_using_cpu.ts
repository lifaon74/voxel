import {
  u16,
  u32,
  vec3,
  vec3_create,
  vec3_f32,
  vec3_from_values,
  vec3_transform_mat4,
  vec4,
  vec4_create,
} from '@lifaon/math';
import { vec3_transform_mat4_z } from '../../functions/vec3_transform_mat4_z';
import { IReadonlyLightSpectrum } from '../../objects/light/light-spectrum.type';
import { IRadialLightIn3dSpace } from '../../objects/light/radial-light-in-3d-space.type';
import { IVoxelOctreeIn3dSpace } from '../../objects/voxel-octree/voxel-octree-in-3d-space.type';
import { NO_MATERIAL } from '../../voxel/octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../../voxel/raytrace/voxel-octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';
import { get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights } from './get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights';

export function render_voxel_octrees_and_lights_in_image_data_using_cpu(
  colorBuffer: Float32Array, // rgb
  lightBuffer: Float32Array, // rgb
  hitBuffer: Float32Array, // xyz
  voxelOctreesIn3dSpace: readonly IVoxelOctreeIn3dSpace[],
  lightsIn3dSpace: readonly IRadialLightIn3dSpace[],
  ambientLightSpectrum: IReadonlyLightSpectrum,
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

export function render_voxel_octrees_and_lights_in_image_data_using_cpu_2(
  voxelOctreeIn3dSpace: IVoxelOctreeIn3dSpace,
  width: u16,
  height: u16,
  colorBuffer: Float32Array, // rgb
  hitBuffer: Float32Array, // xyz
): void {
  const widthM1: u16 = width - 1;
  const heightM1: u16 = height - 1;

  const rayStartPointInNDCSpace: vec3 = vec3_from_values(0, 0, 0);
  const rayEndPointInNDCSpace: vec3 = vec3_from_values(0, 0, 1);
  const tempHitPointInNDC: vec3 = vec3_create();

  const rayStartPointInVoxelSpace: vec3 = vec3_create();
  const rayEndPointInVoxelSpace: vec3 = vec3_create();
  const tempHitPointInVoxelSpace: vec3 = vec3_create();

  vec3_transform_mat4(
    rayStartPointInVoxelSpace,
    rayStartPointInNDCSpace,
    voxelOctreeIn3dSpace.mvpi,
  );
  vec3_transform_mat4(rayEndPointInVoxelSpace, rayEndPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);

  const color: vec4 = vec4_create();

  let i: u32 = 0;
  for (let y: u16 = 0; y < height; y++) {
    rayStartPointInNDCSpace[1] = rayEndPointInNDCSpace[1] = -((2 * y - heightM1) / height); // negate because y axis of Image data is opposite of viewport

    for (let x: u16 = 0; x < width; x++) {
      rayStartPointInNDCSpace[0] = rayEndPointInNDCSpace[0] = (2 * x - widthM1) / width;
      // tempHitPointInNDC = hitBuffer.subarray(i, i + 3) as unknown as vec3;

      const tempVoxelMaterialAddress: u32 = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
        tempHitPointInVoxelSpace,
        rayStartPointInVoxelSpace,
        rayEndPointInVoxelSpace,
        voxelOctreeIn3dSpace.memory,
        voxelOctreeIn3dSpace.address,
        voxelOctreeIn3dSpace.depth,
      );

      if (tempVoxelMaterialAddress !== NO_MATERIAL) {
        vec3_transform_mat4(tempHitPointInNDC, tempHitPointInVoxelSpace, voxelOctreeIn3dSpace.mvp);

        if (tempHitPointInNDC[2] < hitBuffer[i + 2]) {
        }
      }
      // get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights(
      //   color,
      //   voxelOctreesIn3dSpace,
      //   lightsIn3dSpace,
      //   ambientLightSpectrum,
      //   rayStartPointInNDCSpace,
      //   rayEndPointInNDCSpace,
      // );

      imageData.data[i++] = color[0] * 255;
      imageData.data[i++] = color[1] * 255;
      imageData.data[i++] = color[2] * 255;
      imageData.data[i++] = color[3] * 255;
    }
  }
}
