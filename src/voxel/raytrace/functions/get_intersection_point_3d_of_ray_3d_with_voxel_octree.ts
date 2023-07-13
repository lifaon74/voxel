import { is_valid_point, make_point_invalid, u32, u8, vec3, vec3_add, vec3_create, vec3_create_u16, vec3_subtract } from '@lifaon/math';
import { read_u32_from_memory } from '../../memory/functions/read-write/u32/read_u32_from_memory';
import { IMemory } from '../../memory/memory.type';
import { IMemoryAddress } from '../../memory/types/memory-address.type';
import { voxel_octree_depth_to_side } from '../../octree/functions/depth-side/voxel_octree_depth_to_side';
import {
  get_voxel_octree_child_index_from_position_3d,
} from '../../octree/functions/voxel-octree-child/index/get_voxel_octree_child_index_from_position_3d';
import {
  get_voxel_octree_child_memory_address_from_voxel_octree_child_index,
} from '../../octree/functions/voxel-octree-child/index/get_voxel_octree_child_memory_address_from_voxel_octree_child_index';
import {
  is_voxel_octree_child_index_a_voxel_octree_address,
} from '../../octree/functions/voxel-octree-child/index/is_voxel_octree_child_index_a_voxel_octree_address';
import { NO_MATERIAL } from '../../octree/special-addresses.constant';
import { IVoxelOctreeCoordinates } from '../types/voxel-octree-coordinates.type';
import { convert_entry_or_exit_point_3d_to_voxel_octree_coordinates } from './convert_entry_or_exit_point_3d_to_voxel_octree_coordinates';
import {
  convert_voxel_octree_coordinates_to_voxel_octree_child_coordinates,
} from './convert_voxel_octree_coordinates_to_voxel_octree_child_coordinates';
import { get_entry_point_3d_of_ray_3d_with_cube } from './get_entry_point_3d_of_ray_3d_with_cube';
import { get_exit_point_3d_of_ray_3d_with_cube } from './get_exit_point_3d_of_ray_3d_with_cube';
import { is_point_on_cube_surface_or_outside } from './is_point_on_cube_surface_or_outside';

const VOXEL_OCTREE_COORDINATES: IVoxelOctreeCoordinates = vec3_create_u16();
const RAY_POSITION: vec3 = vec3_create();

/**
 * Returns the hit point of a ray and a <voxelOctree>.
 *  - assumes the cube has no transformation (no translation nor rotation)
 */
export function get_intersection_point_3d_of_ray_3d_with_voxel_octree(
  // where the ray is hitting this <voxelOctree>
  out: vec3,
  // RAY
  rayPosition: vec3,
  rayVector: vec3,
  // VOXEL_OCTREE
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
): IMemoryAddress { // voxelMaterialAddress
  make_point_invalid(out);

  const side: u32 = voxel_octree_depth_to_side(voxelOctreeDepth);

  // get the entry point where the ray enters this <voxelOctree>
  get_entry_point_3d_of_ray_3d_with_cube(
    out,
    rayPosition,
    rayVector,
    side,
  );

  if (is_valid_point(out)) {
    let i: u32 = 0;
    while (i++ < side) {
      // converts this entry point into the voxel coordinates space
      convert_entry_or_exit_point_3d_to_voxel_octree_coordinates(
        VOXEL_OCTREE_COORDINATES,
        out,
        rayVector,
      );

      let localVoxelOctreeAddress: IMemoryAddress = voxelOctreeAddress;
      let localVoxelOctreeDepth: u8 = voxelOctreeDepth;

      // begin reading the <voxelMaterialAddress> located at VOXEL_OCTREE_COORDINATES
      while (localVoxelOctreeDepth >= 0) {
        const voxelOctreeChildIndex: u8 = get_voxel_octree_child_index_from_position_3d(
          localVoxelOctreeDepth,
          VOXEL_OCTREE_COORDINATES,
        );

        const voxelOctreeChildAddress: IMemoryAddress = read_u32_from_memory(
          memory,
          get_voxel_octree_child_memory_address_from_voxel_octree_child_index(
            voxelOctreeAddress,
            voxelOctreeChildIndex,
          ),
        );

        if (
          is_voxel_octree_child_index_a_voxel_octree_address(
            memory,
            voxelOctreeAddress,
            voxelOctreeChildIndex,
          )
        ) {
          localVoxelOctreeAddress = voxelOctreeChildAddress;
          localVoxelOctreeDepth--;
        } else {
          // we've found a <voxelOctreeChild> fully transparent, so:
          //  - we have to find where the ray exits this <voxelOctreeChild>
          //  - repeat with these new coordinates
          if (voxelOctreeChildAddress === NO_MATERIAL) {
            // get the side of this <voxelOctreeChild>
            const localSide: u32 = 1 << localVoxelOctreeDepth;

            // get the coordinates of this <voxelOctreeChild>
            convert_voxel_octree_coordinates_to_voxel_octree_child_coordinates(
              VOXEL_OCTREE_COORDINATES,
              VOXEL_OCTREE_COORDINATES,
              localSide,
            );

            // get a temporary ray position relative to this <voxelOctreeChild>
            vec3_subtract(
              RAY_POSITION,
              rayVector,
              VOXEL_OCTREE_COORDINATES,
            );

            // compute where this ray exits this <voxelOctreeChild>
            get_exit_point_3d_of_ray_3d_with_cube(
              out,
              RAY_POSITION,
              rayVector,
              localSide,
            );

            if (!is_valid_point(out)) {
              debugger;
              get_exit_point_3d_of_ray_3d_with_cube(
                out,
                RAY_POSITION,
                rayVector,
                localSide,
              );
              return NO_MATERIAL;
            }

            // translate the resulting exit point to real coordinates space
            vec3_add(
              out,
              out,
              VOXEL_OCTREE_COORDINATES,
            );

            // finally check if the point leaves the voxel
            if (
              is_point_on_cube_surface_or_outside(
                out,
                side,
              )
            ) {
              return NO_MATERIAL;
            } else {
              break;
            }
          } else {
            return voxelOctreeChildAddress;
          }
        }
      }
    }
  }

  return NO_MATERIAL;
}
