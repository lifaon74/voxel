import {
  readonly_vec3,
  u32,
  vec3,
  vec3_copy,
  vec3_create,
  vec3_transform_mat4,
} from '@lifaon/math';
import { vec3_transform_mat4_z } from '../../../../functions/vec3_transform_mat4_z';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { NO_MATERIAL } from '../../../octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../../voxel-octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';

export interface IGetIntersectionPoint3dOfRay3dWithManyVoxelOctreesResult {
  readonly index: number;
  readonly voxelMaterialAddress: number;
  readonly hitPointInVoxelSpace: readonly_vec3;
}

export function get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees(
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  rayStartPointInNDCSpace: vec3,
  rayEndPointInNDCSpace: vec3,
): IGetIntersectionPoint3dOfRay3dWithManyVoxelOctreesResult {
  const rayStartPointInVoxelSpace: vec3 = vec3_create();
  const rayEndPointInVoxelSpace: vec3 = vec3_create();
  const tempHitPointInVoxelSpace: vec3 = vec3_create();

  let index: number = -1;
  let voxelMaterialAddress: number = NO_MATERIAL;
  const hitPointInVoxelSpace: vec3 = vec3_create();

  // TODO: discard points where Z is outside of NDC space ?
  let hitPointZInNDCSpace: number = Number.POSITIVE_INFINITY;

  for (let i = 0, l = voxelOctreesIn3dSpace.length; i < l; i++) {
    const voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait = voxelOctreesIn3dSpace[i];

    vec3_transform_mat4(
      rayStartPointInVoxelSpace,
      rayStartPointInNDCSpace,
      voxelOctreeIn3dSpace.mvpi,
    );
    vec3_transform_mat4(rayEndPointInVoxelSpace, rayEndPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);

    const tempVoxelMaterialAddress: u32 = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
      tempHitPointInVoxelSpace,
      rayStartPointInVoxelSpace,
      rayEndPointInVoxelSpace,
      voxelOctreeIn3dSpace.memory,
      voxelOctreeIn3dSpace.address,
      voxelOctreeIn3dSpace.depth,
    );

    if (tempVoxelMaterialAddress !== NO_MATERIAL) {
      const z: number = vec3_transform_mat4_z(tempHitPointInVoxelSpace, voxelOctreeIn3dSpace.mvp);

      if (z < hitPointZInNDCSpace) {
        index = i;
        voxelMaterialAddress = tempVoxelMaterialAddress;
        vec3_copy(hitPointInVoxelSpace, tempHitPointInVoxelSpace);
        hitPointZInNDCSpace = z;
      }
    }
  }

  return {
    index,
    voxelMaterialAddress,
    hitPointInVoxelSpace,
  };
}
