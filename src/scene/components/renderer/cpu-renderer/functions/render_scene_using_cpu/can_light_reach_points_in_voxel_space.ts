import { vec3, vec3_create, vec3_transform_mat4 } from '@lifaon/math';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { is_ray_3d_intersecting_with_voxel_octree } from '../get_intersection_point_3d_of_ray_3d_with_voxel_octree/is_ray_3d_intersecting_with_voxel_octree';

const LIGHT_POINT_IN_VOXEL_SPACE: vec3 = vec3_create();

export function can_light_reach_points_in_voxel_space(
  lightPointInNDCSpace: vec3,
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  pointsToReachInVoxelSpace: readonly vec3[],
): boolean {
  // for each <voxelOctree>
  for (
    let voxelOctreeIndex: number = 0;
    voxelOctreeIndex < voxelOctreesIn3dSpace.length;
    voxelOctreeIndex++
  ) {
    const voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait = voxelOctreesIn3dSpace[voxelOctreeIndex];

    const lightPointInVoxelSpace: vec3 = vec3_transform_mat4(
      LIGHT_POINT_IN_VOXEL_SPACE,
      lightPointInNDCSpace,
      voxelOctreeIn3dSpace.mvpi,
    );

    const pointToReachInVoxelSpace: vec3 = pointsToReachInVoxelSpace[voxelOctreeIndex];

    if (
      is_ray_3d_intersecting_with_voxel_octree(
        pointToReachInVoxelSpace,
        lightPointInVoxelSpace,
        voxelOctreeIn3dSpace.memory,
        voxelOctreeIn3dSpace.address,
        voxelOctreeIn3dSpace.depth,
      )
    ) {
      return false;
    }
  }

  return true;
}
