import {
  readonly_mat4,
  vec3,
  vec3_clone,
  vec3_create,
  vec3_scale_and_add,
  vec3_squared_length,
  vec3_transform_mat4,
  vec4,
} from '@lifaon/math';
import { null_vec3_transform_mat4 } from '../../functions/null_vec3_transform_mat4';
import { ReadonlyMemoryTrait } from '../../memory/read/readonly/traits/readonly-memory.trait';
import { ILightSpectrum, IReadonlyLightSpectrum } from '../../objects/light/light-spectrum.type';
import { IRadialLightIn3dSpace } from '../../objects/light/radial-light-in-3d-space.type';
import { IVoxelOctreeIn3dSpace } from '../../objects/voxel-octree/voxel-octree-in-3d-space.type';
import { NO_MATERIAL } from '../../voxel/octree/special-addresses.constant';
import { can_ray_3d_reach_light_through_many_voxel_octrees } from '../../voxel/raytrace/functions_legacy/can_ray_3d_reach_light_through_many_voxel_octrees';
import {
  get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees,
  IGetIntersectionPoint3dOfRay3dWithManyVoxelOctreesResult,
} from '../../voxel/raytrace/functions_legacy/get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees';

export function get_resulting_color_of_ray_3d_with_many_voxel_octrees_and_many_lights(
  color: vec4, // out
  voxelOctreesIn3dSpace: readonly IVoxelOctreeIn3dSpace[],
  lightsIn3dSpace: readonly IRadialLightIn3dSpace[],
  ambientLightSpectrum: IReadonlyLightSpectrum,
  rayStartPointInNDCSpace: vec3,
  rayEndPointInNDCSpace: vec3,
): void {
  const result: IGetIntersectionPoint3dOfRay3dWithManyVoxelOctreesResult =
    get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees(
      voxelOctreesIn3dSpace,
      rayStartPointInNDCSpace,
      rayEndPointInNDCSpace,
    );

  if (result.index === -1 || result.voxelMaterialAddress === NO_MATERIAL) {
    color[0] = 0;
    color[1] = 0;
    color[2] = 0;
    color[3] = 0;
  } else {
    const hitPointInVoxelSpace: vec3 = result.hitPointInVoxelSpace;
    const voxelMaterialAddress: number = result.voxelMaterialAddress;
    const voxelOctreeIn3dSpace: IVoxelOctreeIn3dSpace = voxelOctreesIn3dSpace[result.index];
    const voxelOctreeMVP: readonly_mat4 = voxelOctreeIn3dSpace.mvp;
    const voxelOctreeMemory: ReadonlyMemoryTrait = voxelOctreeIn3dSpace.memory;

    const lightSpectrum: ILightSpectrum = vec3_clone(ambientLightSpectrum);
    const lightPointInNDCSpace: vec3 = vec3_create(); // where is located the light's source
    const hitPointInNDCSpace: vec3 = vec3_create(); // where is located the hit point between the ray and the voxel

    vec3_transform_mat4(hitPointInNDCSpace, hitPointInVoxelSpace, voxelOctreeMVP);

    for (let i = 0, l = lightsIn3dSpace.length; i < l; i++) {
      const light: IRadialLightIn3dSpace = lightsIn3dSpace[i];
      const lightMVP: readonly_mat4 = light.mvp;
      const lightMVPI: readonly_mat4 = light.mvpi;

      // accelerated because lightPointInLightSpace is static (0, 0, 0)
      null_vec3_transform_mat4(lightPointInNDCSpace, lightMVP);

      const hit: boolean = can_ray_3d_reach_light_through_many_voxel_octrees(
        voxelOctreesIn3dSpace,
        hitPointInNDCSpace,
        lightPointInNDCSpace,
        voxelOctreeIn3dSpace,
        hitPointInVoxelSpace,
      );

      if (!hit) {
        const hitPointInLightSpace: vec3 = vec3_create();
        vec3_transform_mat4(hitPointInLightSpace, hitPointInNDCSpace, lightMVPI);
        vec3_scale_and_add(
          lightSpectrum,
          lightSpectrum,
          light.spectrum,
          1 / vec3_squared_length(hitPointInLightSpace),
        );
      }
    }

    color[0] = lightSpectrum[0] * (voxelOctreeMemory.read_u8(voxelMaterialAddress) / 255);
    color[1] = lightSpectrum[1] * (voxelOctreeMemory.read_u8(voxelMaterialAddress + 1) / 255);
    color[2] = lightSpectrum[2] * (voxelOctreeMemory.read_u8(voxelMaterialAddress + 2) / 255);
    color[3] = 1;
  }
}
