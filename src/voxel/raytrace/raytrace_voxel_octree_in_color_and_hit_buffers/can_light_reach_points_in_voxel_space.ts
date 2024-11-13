import {
  vec3,
  vec3_create,
  vec3_normalize,
  vec3_scale_and_add,
  vec3_subtract,
  vec3_transform_mat4,
} from '@lifaon/math';
import { VoxelOctreeIn3dSpaceTrait } from '../../../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { is_ray_3d_intersecting_with_voxel_octree } from '../get_intersection_point_3d_of_ray_3d_with_voxel_octree/is_ray_3d_intersecting_with_voxel_octree';

const LIGHT_POINT_IN_VOXEL_SPACE: vec3 = vec3_create();

export function can_light_reach_points_in_voxel_space(
  lightPointInNDCSpace: vec3,
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  pointsToReachInVoxelSpace: readonly vec3[],
): boolean {
  const lightPointInVoxelSpace: vec3 = LIGHT_POINT_IN_VOXEL_SPACE;

  for (
    let voxelOctreeIndex: number = 0;
    voxelOctreeIndex < voxelOctreesIn3dSpace.length;
    voxelOctreeIndex++
  ) {
    const voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait = voxelOctreesIn3dSpace[voxelOctreeIndex];

    vec3_transform_mat4(lightPointInVoxelSpace, lightPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);

    // TODO improve
    const pointToReachInVoxelSpace: vec3 = vec3_create();
    vec3_scale_and_add(
      pointToReachInVoxelSpace,
      pointsToReachInVoxelSpace[voxelOctreeIndex],
      vec3_normalize(
        pointToReachInVoxelSpace,
        vec3_subtract(
          pointToReachInVoxelSpace,
          pointsToReachInVoxelSpace[voxelOctreeIndex],
          lightPointInVoxelSpace,
        ),
      ),
      -0.1,
    );

    if (
      is_ray_3d_intersecting_with_voxel_octree(
        lightPointInVoxelSpace,
        pointToReachInVoxelSpace,
        voxelOctreeIn3dSpace.memory,
        voxelOctreeIn3dSpace.address,
        voxelOctreeIn3dSpace.depth,
      )
      // is_ray_3d_intersecting_with_voxel_octree(
      //   lightPointInVoxelSpace,
      //   pointsToReachInVoxelSpace[voxelOctreeIndex],
      //   voxelOctreeIn3dSpace.memory,
      //   voxelOctreeIn3dSpace.address,
      //   voxelOctreeIn3dSpace.depth,
      // )
    ) {
      return false;
    }
  }

  return true;
}
