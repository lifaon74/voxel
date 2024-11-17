import {
  u32,
  u8,
  vec3,
  vec3_add,
  vec3_create,
  vec3_create_u32,
  vec3_subtract,
  vec3_u32,
} from '@lifaon/math';
import { MemoryReadU32BETrait } from '../../../../../../memory/read/readonly/traits/methods/memory.read_u32_be.trait';
import { MemoryReadU8Trait } from '../../../../../../memory/read/readonly/traits/methods/memory.read_u8.trait';
import { ptr, ptr_set } from '../../../../../../misc/ptr';
import { voxel_octree_depth_to_side } from '../../../../../../voxel/octree/depth-side/voxel_octree_depth_to_side';
import { NO_MATERIAL } from '../../../../../../voxel/octree/special-addresses.constant';
import { get_voxel_octree_child_index_from_position_3d } from '../../../../../../voxel/octree/voxel-octree-child/index/get_voxel_octree_child_index_from_position_3d';
import { get_voxel_octree_child_memory_address_from_voxel_octree_child_index } from '../../../../../../voxel/octree/voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';
import { is_voxel_octree_child_index_a_voxel_octree_address } from '../../../../../../voxel/octree/voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';
import { get_entry_point_3d_of_ray_3d_with_cube } from './functions/get_entry_point_3d_of_ray_3d_with_cube/get_entry_point_3d_of_ray_3d_with_cube';
import { get_exit_point_3d_of_ray_3d_with_cube } from './functions/get_exit_point_3d_of_ray_3d_with_cube/get_exit_point_3d_of_ray_3d_with_cube';
import { get_voxel_octree_position_3d_from_voxel_position_3d } from './functions/get_voxel_octree_position_3d_from_voxel_position_3d/get_voxel_octree_position_3d_from_voxel_position_3d';
import { get_voxel_position_3d_from_ray_hit_point_3d } from './functions/get_voxel_position_3d_from_ray_hit_point_3d/get_voxel_position_3d_from_ray_hit_point_3d';
import { is_point_3d_on_cube_surface_or_outside } from './functions/is_point_on_cube_surface_or_outside/is_point_3d_on_cube_surface_or_outside';

const VOXEL_POSITION: vec3_u32 = vec3_create_u32();
const RAY_START_POINT: vec3 = vec3_create();
const RAY_END_POINT: vec3 = vec3_create();

export type GetIntersectionPoint3dOfRay3dWithVoxelOctreeMemory = MemoryReadU8Trait &
  MemoryReadU32BETrait;

/**
 * Computes the **intersection** point of a ray and a `<voxelOctree>`.
 *
 * **INFO**: the `<voxelOctree>` is placed at (0, 0, 0) and "grows" on each axis with a side of `side` (voxel space).
 *
 * @param rayStartPoint
 * @param rayEndPoint
 * @param memory
 * @param voxelOctreeAddress
 * @param voxelOctreeDepth
 * @param outputRayHitPoint the point where the ray hits the `<voxelOctree>`
 * @param outputNormalVector the normal vector (relative to the surface) where the ray hits the `<voxelOctree>`.
 * @param outputVoxelMaterialAddress the material address where the ray hits `<voxelOctree>`
 * @returns `true` if the ray hit something
 */
export function get_intersection_point_3d_of_ray_3d_with_voxel_octree(
  // RAY
  rayStartPoint: vec3,
  rayEndPoint: vec3,
  // VOXEL_OCTREE
  memory: GetIntersectionPoint3dOfRay3dWithVoxelOctreeMemory,
  voxelOctreeAddress: u32,
  voxelOctreeDepth: u8,
  // OUTPUTS
  outputRayHitPoint: vec3,
  outputNormalVector: vec3,
  outputVoxelMaterialAddress: ptr<u32>,
): boolean {
  const side: u32 = voxel_octree_depth_to_side(voxelOctreeDepth);

  if (
    get_entry_point_3d_of_ray_3d_with_cube(
      rayStartPoint,
      rayEndPoint,
      side,
      outputRayHitPoint,
      outputNormalVector,
    )
  ) {
    let i: u32 = 0;
    while (i++ < side) {
      // converts this entry or exit point into the voxel coordinates space
      get_voxel_position_3d_from_ray_hit_point_3d(
        outputRayHitPoint,
        rayStartPoint,
        rayEndPoint,
        VOXEL_POSITION,
      );

      let localVoxelOctreeAddress: u32 = voxelOctreeAddress;
      let localVoxelOctreeDepth: u8 = voxelOctreeDepth;

      // begins reading the <voxelMaterialAddress> located at the new ray's origin
      while (localVoxelOctreeDepth >= 0) {
        const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_position_3d(
          localVoxelOctreeDepth,
          VOXEL_POSITION,
        );

        const voxelOctreeChildAddress: u32 = memory.read_u32_be(
          get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
            localVoxelOctreeAddress,
            voxelOctreeChildIndex,
          ),
        );

        if (
          is_voxel_octree_child_index_a_voxel_octree_address(
            memory,
            localVoxelOctreeAddress,
            voxelOctreeChildIndex,
          )
        ) {
          localVoxelOctreeAddress = voxelOctreeChildAddress;
          localVoxelOctreeDepth--;
        } else {
          // we've found a <voxelOctreeChild> fully transparent, so:
          //  - we have to compute where the ray exits this <voxelOctreeChild>
          //  - and repeat the process with these new coordinates
          if (voxelOctreeChildAddress === NO_MATERIAL) {
            const localSide: u32 = 1 << localVoxelOctreeDepth;

            // gets the coordinates of this <voxelOctreeChild>
            get_voxel_octree_position_3d_from_voxel_position_3d(
              VOXEL_POSITION,
              localSide,
              VOXEL_POSITION,
            );

            // gets a temporary ray start point relative to this <voxelOctreeChild>
            vec3_subtract(RAY_START_POINT, rayStartPoint, VOXEL_POSITION);

            // gets a temporary ray end point relative to this <voxelOctreeChild>
            vec3_subtract(RAY_END_POINT, rayEndPoint, VOXEL_POSITION);

            if (
              get_exit_point_3d_of_ray_3d_with_cube(
                RAY_START_POINT,
                RAY_END_POINT,
                localSide,
                outputRayHitPoint,
                outputNormalVector,
              )
            ) {
              // translates the resulting exit point to the real coordinates space
              vec3_add(outputRayHitPoint, outputRayHitPoint, VOXEL_POSITION);

              // finally we check if the point leaves the <voxelOctree>
              if (is_point_3d_on_cube_surface_or_outside(outputRayHitPoint, side)) {
                return false;
              } else {
                break;
              }
            } else {
              return false;
            }
          } else {
            ptr_set(outputVoxelMaterialAddress, voxelOctreeChildAddress);
            return true;
          }
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
