import {
  readonly_vec3,
  u32,
  vec3,
  vec3_copy,
  vec3_create,
  vec3_transform_mat4,
} from '@lifaon/math';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { NO_MATERIAL } from '../../../../../../../voxel/octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../../voxel-octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';

export function can_ray_3d_reach_light_through_many_voxel_octrees(
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  hitPointInNDCSpace: vec3,
  lightPointInNDCSpace: vec3,
  // WHERE the ray hits the voxelOctreeIn3dSpace => used to reduce floating point precision
  _voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait,
  _hitPointInVoxelSpace: readonly_vec3,
): boolean {
  const lightHitPointInVoxelSpace: vec3 = vec3_create();
  const rayStartPointInVoxelSpace: vec3 = vec3_create();
  const rayEndPointInVoxelSpace: vec3 = vec3_create();

  for (let i = 0, l = voxelOctreesIn3dSpace.length; i < l; i++) {
    const voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait = voxelOctreesIn3dSpace[i];

    if (voxelOctreeIn3dSpace === _voxelOctreeIn3dSpace) {
      vec3_copy(rayStartPointInVoxelSpace, _hitPointInVoxelSpace);
    } else {
      vec3_transform_mat4(rayStartPointInVoxelSpace, hitPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);
    }
    vec3_transform_mat4(rayEndPointInVoxelSpace, lightPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);

    const voxelMaterialAddress: u32 = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
      lightHitPointInVoxelSpace,
      rayStartPointInVoxelSpace,
      rayEndPointInVoxelSpace,
      voxelOctreeIn3dSpace.memory,
      voxelOctreeIn3dSpace.address,
      voxelOctreeIn3dSpace.depth,
    );

    if (voxelMaterialAddress !== NO_MATERIAL) {
      return true;
    }
  }

  return false;
}

// export function can_ray_3d_reach_light_through_many_voxel_octrees(
//   voxelOctreesIn3dSpace: readonly IVoxelOctreeIn3dSpace[],
//   hitPointInNDCSpace: vec3,
//   lightPointInNDCSpace: vec3,
// ): boolean {
//   const lightHitPointInVoxelSpace: vec3 = vec3_create();
//   const rayStartPointInVoxelSpace: vec3 = vec3_create();
//   const rayEndPointInVoxelSpace: vec3 = vec3_create();
//
//   for (let i = 0, l = voxelOctreesIn3dSpace.length; i < l; i++) {
//     const voxelOctreeIn3dSpace: IVoxelOctreeIn3dSpace = voxelOctreesIn3dSpace[i];
//
//     vec3_transform_mat4(rayStartPointInVoxelSpace, hitPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);
//     vec3_transform_mat4(rayEndPointInVoxelSpace, lightPointInNDCSpace, voxelOctreeIn3dSpace.mvpi);
//
//     const voxelMaterialAddress: IMemoryAddress = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
//       lightHitPointInVoxelSpace,
//       rayStartPointInVoxelSpace,
//       rayEndPointInVoxelSpace,
//       voxelOctreeIn3dSpace.memory,
//       voxelOctreeIn3dSpace.address,
//       voxelOctreeIn3dSpace.depth,
//     );
//
//     if (voxelMaterialAddress !== NO_MATERIAL) {
//       return true;
//     }
//   }
//
//   return false;
// }
