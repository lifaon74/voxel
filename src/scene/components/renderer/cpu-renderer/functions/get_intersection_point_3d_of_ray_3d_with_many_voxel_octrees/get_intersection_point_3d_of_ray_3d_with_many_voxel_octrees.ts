import { f32, u32, u8, vec3, vec3_copy, vec3_create, vec3_transform_mat4 } from '@lifaon/math';
import { vec3_transform_mat4_z } from '../../../../../../functions/vec3_transform_mat4_z';
import { ptr, ptr_create, ptr_get, ptr_set } from '../../../../../../misc/ptr';
import { NO_MATERIAL } from '../../../../../../voxel/octree/special-addresses.constant';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../get_intersection_point_3d_of_ray_3d_with_voxel_octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';

const RAY_START_POINT_IN_VOXEL_SPACE = vec3_create();
const RAY_END_POINT_IN_VOXEL_SPACE = vec3_create();
const RAY_HIT_POINT_IN_VOXEL_SPACE = vec3_create();
const NORMAL_VECTOR_IN_VOXEL_SPACE = vec3_create();
const VOXEL_MATERIAL_ADDRESS = ptr_create<u32>(NO_MATERIAL);

export function get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees(
  // RAY
  rayStartPointInNDCSpace: vec3,
  rayEndPointInNDCSpace: vec3,
  // VOXEL_OCTREES
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  // OUTPUTS
  outputRayHitPointInVoxelSpace: vec3,
  outputNormalVectorInVoxelSpace: vec3,
  outputVoxelOctreeIndexPtr: ptr<u8>,
  outputVoxelMaterialAddressPtr: ptr<u32>,
): boolean {
  let z: f32 = 1.0;

  for (let i: u8 = 0; i < voxelOctreesIn3dSpace.length; i++) {
    const voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait = voxelOctreesIn3dSpace[i];

    // computes ray's start point in voxel space
    const rayStartPointInVoxelSpace: vec3 = vec3_transform_mat4(
      RAY_START_POINT_IN_VOXEL_SPACE,
      rayStartPointInNDCSpace,
      voxelOctreeIn3dSpace.mvpi,
    );

    // computes ray's end point in voxel space
    const rayEndPointInVoxelSpace: vec3 = vec3_transform_mat4(
      RAY_END_POINT_IN_VOXEL_SPACE,
      rayEndPointInNDCSpace,
      voxelOctreeIn3dSpace.mvpi,
    );

    // outputs
    const rayHitPointInVoxelSpace: vec3 = RAY_HIT_POINT_IN_VOXEL_SPACE;
    const normalVectorInVoxelSpace: vec3 = NORMAL_VECTOR_IN_VOXEL_SPACE;
    const voxelMaterialAddress: ptr<u32> = VOXEL_MATERIAL_ADDRESS;

    if (
      get_intersection_point_3d_of_ray_3d_with_voxel_octree(
        rayStartPointInVoxelSpace,
        rayEndPointInVoxelSpace,
        voxelOctreeIn3dSpace.memory,
        voxelOctreeIn3dSpace.address,
        voxelOctreeIn3dSpace.depth,
        rayHitPointInVoxelSpace,
        normalVectorInVoxelSpace,
        voxelMaterialAddress,
      )
    ) {
      const ray_z: f32 = vec3_transform_mat4_z(rayHitPointInVoxelSpace, voxelOctreeIn3dSpace.mvp);

      if (ray_z < z) {
        z = ray_z;
        vec3_copy(outputRayHitPointInVoxelSpace, rayHitPointInVoxelSpace);
        vec3_copy(outputNormalVectorInVoxelSpace, normalVectorInVoxelSpace);
        ptr_set(outputVoxelOctreeIndexPtr, i);
        ptr_set(outputVoxelMaterialAddressPtr, ptr_get(voxelMaterialAddress));
      }
    }
  }

  return z !== 1;
}
