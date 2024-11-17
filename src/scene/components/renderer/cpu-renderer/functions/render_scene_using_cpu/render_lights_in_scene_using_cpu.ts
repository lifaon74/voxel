import {
  f32,
  u8,
  vec3,
  vec3_copy,
  vec3_create,
  vec3_dot,
  vec3_normalize,
  vec3_scale_and_add,
  vec3_squared_length,
  vec3_subtract,
  vec3_transform_mat4,
} from '@lifaon/math';
import { RadialLightIn3dSpaceTrait } from '../../../../../traits/light/radial-light-in-3d-space.trait';
import { LightSpectrum } from '../../../../../traits/light/types/light-spectrum';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { can_light_reach_points_in_voxel_space } from './can_light_reach_points_in_voxel_space';
import { convert_ray_hit_point_in_ndc_space_to_voxel_space } from './convert_ray_hit_point_in_ndc_space_to_voxel_space';

const RAY_HIT_POINT_IN_LIGHT_SPACE: vec3 = vec3_create();
const LIGHT_POINT_IN_VOXEL_SPACE: vec3 = vec3_create();
const LIGHT_VECTOR_IN_VOXEL_SPACE: vec3 = vec3_create();
const NORMALIZED_LIGHT_POINT_IN_VOXEL_SPACE: vec3 = vec3_create();

export function render_lights_in_scene_using_cpu(
  // RAY
  rayHitPointInVoxelSpace: vec3,
  rayHitPointInNDCSpace: vec3,
  hitNormalVectorInVoxelSpace: vec3,
  hitVoxelOctreeIndex: u8,
  // SCENE
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[],
  ambientLightSpectrum: LightSpectrum,
  // OUTPUTS
  outputLightSpectrum: LightSpectrum,
): void {
  // pre-computes the hit points in voxel space
  const rayHitPointsInInVoxelSpace: readonly vec3[] =
    convert_ray_hit_point_in_ndc_space_to_voxel_space(
      rayHitPointInVoxelSpace,
      rayHitPointInNDCSpace,
      hitVoxelOctreeIndex,
      voxelOctreesIn3dSpace,
    );

  // set up the outputLightSpectrum
  vec3_copy(outputLightSpectrum, ambientLightSpectrum);

  // for each light
  for (let lightIndex: number = 0; lightIndex < lightsIn3dSpace.length; lightIndex++) {
    const lightIn3dSpace: RadialLightIn3dSpaceTrait = lightsIn3dSpace[lightIndex];
    const lightPointInNDCSpace: vec3 = lightIn3dSpace.position_in_ndc;

    if (
      can_light_reach_points_in_voxel_space(
        lightPointInNDCSpace,
        voxelOctreesIn3dSpace,
        rayHitPointsInInVoxelSpace,
      )
    ) {
      const lightPointInVoxelSpace: vec3 = vec3_transform_mat4(
        LIGHT_POINT_IN_VOXEL_SPACE,
        lightPointInNDCSpace,
        voxelOctreesIn3dSpace[hitVoxelOctreeIndex].mvpi,
      );

      const lightVectorInVoxelSpace: vec3 = vec3_subtract(
        LIGHT_VECTOR_IN_VOXEL_SPACE,
        lightPointInVoxelSpace,
        rayHitPointInVoxelSpace,
      );

      const normalizedLightVectorInVoxelSpace: vec3 = vec3_normalize(
        NORMALIZED_LIGHT_POINT_IN_VOXEL_SPACE,
        lightVectorInVoxelSpace,
      );

      const dot: f32 = vec3_dot(hitNormalVectorInVoxelSpace, normalizedLightVectorInVoxelSpace);
      // const dot: f32 = 1;

      if (dot > 0) {
        const rayHitPointInLightSpace: vec3 = vec3_transform_mat4(
          RAY_HIT_POINT_IN_LIGHT_SPACE,
          rayHitPointInNDCSpace,
          lightIn3dSpace.mvpi,
        );

        const intensity: f32 = vec3_squared_length(rayHitPointInLightSpace);

        vec3_scale_and_add(
          outputLightSpectrum,
          outputLightSpectrum,
          lightIn3dSpace.spectrum,
          dot / intensity,
        );
      }
    }
  }
}
