import {
  f32,
  math_clamp,
  vec3,
  vec3_copy,
  vec3_create,
  vec3_cross,
  vec3_dot,
  vec3_normalize,
  vec3_scale_and_add,
  vec3_squared_length,
  vec3_subtract,
  vec3_transform_mat4,
} from '@lifaon/math';
import { null_vec3_transform_mat4 } from '../../../functions/null_vec3_transform_mat4';
import { RadialLightIn3dSpaceTrait } from '../../../scene/traits/light/radial-light-in-3d-space.trait';
import {
  LightSpectrum,
  ReadonlyLightSpectrum,
} from '../../../scene/traits/light/types/light-spectrum';
import { VoxelOctreeIn3dSpaceTrait } from '../../../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { HitBuffer } from '../types/buffers/hit-buffer';
import { LightBuffer } from '../types/buffers/light-buffer';
import { NormalBuffer } from '../types/buffers/normal-buffer';
import { can_light_reach_points_in_voxel_space } from './can_light_reach_points_in_voxel_space';

const LIGHT_POINT_IN_NDC_SPACE: vec3 = vec3_create();
const LIGHT_POINT_IN_MODEL_SPACE: vec3 = vec3_create();
const POINT_TO_REACH_IN_LIGHT_SPACE: vec3 = vec3_create();

export function abc(
  pointToReachInNDCSpace: vec3,
  normalVectorInWorldSpace: vec3,
  lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[],
  ambientLightSpectrum: ReadonlyLightSpectrum,
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  // OUTPUTS
  outputLightSpectrum: LightSpectrum,
): void {
  const lightPointInNDCSpace: vec3 = LIGHT_POINT_IN_NDC_SPACE;
  const lightPointInModelSpace: vec3 = LIGHT_POINT_IN_MODEL_SPACE;

  // pre-computes the points to reach in voxel space
  const pointsToReachInVoxelSpace: vec3[] = new Array<vec3>(voxelOctreesIn3dSpace.length);
  for (
    let voxelOctreeIndex: number = 0;
    voxelOctreeIndex < voxelOctreesIn3dSpace.length;
    voxelOctreeIndex++
  ) {
    pointsToReachInVoxelSpace[voxelOctreeIndex] = vec3_transform_mat4(
      vec3_create(),
      pointToReachInNDCSpace,
      voxelOctreesIn3dSpace[voxelOctreeIndex].mvpi,
    );
  }

  // set up the outputLightSpectrum
  vec3_copy(outputLightSpectrum, ambientLightSpectrum);

  // for each light
  for (let lightIndex: number = 0; lightIndex < lightsIn3dSpace.length; lightIndex++) {
    const lightIn3dSpace: RadialLightIn3dSpaceTrait = lightsIn3dSpace[lightIndex];

    // accelerated because lightPointInLightSpace is static (0, 0, 0)
    // TODO pre-compute
    null_vec3_transform_mat4(lightPointInNDCSpace, lightIn3dSpace.mvp);

    // we check if the light may reach `pointToReachInNDCSpace`
    if (
      can_light_reach_points_in_voxel_space(
        lightPointInNDCSpace,
        voxelOctreesIn3dSpace,
        pointsToReachInVoxelSpace,
      )
    ) {
      // TODO
      null_vec3_transform_mat4(lightPointInModelSpace, lightIn3dSpace.modelMatrix);
      // debugger;
      const dot: f32 = vec3_dot(
        normalVectorInWorldSpace,
        vec3_normalize(
          vec3_create(),
          vec3_subtract(vec3_create(), lightPointInModelSpace, pointToReachInNDCSpace),
        ),
      );

      // dot = math_clamp(dot, 0, 1);

      const pointToReachInLightSpace: vec3 = POINT_TO_REACH_IN_LIGHT_SPACE;
      vec3_transform_mat4(pointToReachInLightSpace, pointToReachInNDCSpace, lightIn3dSpace.mvpi);
      vec3_scale_and_add(
        outputLightSpectrum,
        outputLightSpectrum,
        lightIn3dSpace.spectrum,
        dot / vec3_squared_length(pointToReachInLightSpace),
      );
    }
  }
}

export function def(
  hitBuffer: HitBuffer,
  normalBuffer: NormalBuffer,
  lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[],
  ambientLightSpectrum: ReadonlyLightSpectrum,
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  // OUTPUTS
  lightBuffer: LightBuffer,
): void {
  for (let i: number = 0; i < hitBuffer.length; i += 3) {
    const pointToReachInNDCSpace: vec3 = hitBuffer.subarray(i, i + 3) as unknown as vec3;
    const normalVectorInWorldSpace: vec3 = normalBuffer.subarray(i, i + 3) as unknown as vec3;

    if (pointToReachInNDCSpace[2] <= 1) {
      const lightSpectrum: vec3 = lightBuffer.subarray(i, i + 3) as unknown as vec3;

      abc(
        pointToReachInNDCSpace,
        normalVectorInWorldSpace,
        lightsIn3dSpace,
        ambientLightSpectrum,
        voxelOctreesIn3dSpace,
        lightSpectrum,
      );
    }
  }
}
