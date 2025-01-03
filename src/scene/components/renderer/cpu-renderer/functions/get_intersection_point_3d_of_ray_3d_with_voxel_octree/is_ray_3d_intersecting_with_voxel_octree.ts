import { u32, u8, vec3, vec3_create } from '@lifaon/math';
import { ptr, ptr_create } from '../../../../../../misc/ptr';
import { NO_MATERIAL } from '../../../../../../voxel/octree/special-addresses.constant';
import {
  get_intersection_point_3d_of_ray_3d_with_voxel_octree,
  GetIntersectionPoint3dOfRay3dWithVoxelOctreeMemory,
} from './get_intersection_point_3d_of_ray_3d_with_voxel_octree';

const RAY_HIT_POINT_IN_VOXEL_SPACE: vec3 = vec3_create();
const NORMAL_VECTOR_IN_VOXEL_SPACE: vec3 = vec3_create();
const VOXEL_MATERIAL_ADDRESS: ptr<u32> = ptr_create<u32>(NO_MATERIAL);

export function is_ray_3d_intersecting_with_voxel_octree(
  // RAY
  rayStartPoint: vec3,
  rayEndPoint: vec3,
  // VOXEL_OCTREE
  memory: GetIntersectionPoint3dOfRay3dWithVoxelOctreeMemory,
  voxelOctreeAddress: u32,
  voxelOctreeDepth: u8,
): boolean {
  return get_intersection_point_3d_of_ray_3d_with_voxel_octree(
    rayStartPoint,
    rayEndPoint,
    memory,
    voxelOctreeAddress,
    voxelOctreeDepth,
    RAY_HIT_POINT_IN_VOXEL_SPACE,
    NORMAL_VECTOR_IN_VOXEL_SPACE,
    VOXEL_MATERIAL_ADDRESS,
  );
}
