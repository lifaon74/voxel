import { math_floor, u32, vec3_u32 } from '@lifaon/math';

/**
 * Returns the coordinates of the `<voxelOctree>` containing `voxelPosition`.
 *
 * Works in voxel space (integer coordinates).
 */
export function get_voxel_octree_position_3d_from_voxel_position_3d(
  // the coordinates of the voxel
  voxelPosition: vec3_u32,
  // the side of the <voxelOctree>
  side: u32,
  // OUTPUTS
  voxelOctreePosition: vec3_u32,
): void {
  voxelOctreePosition[0] = get_voxel_octree_position_1d_from_voxel_position_1d(
    voxelPosition[0],
    side,
  );
  voxelOctreePosition[1] = get_voxel_octree_position_1d_from_voxel_position_1d(
    voxelPosition[1],
    side,
  );
  voxelOctreePosition[2] = get_voxel_octree_position_1d_from_voxel_position_1d(
    voxelPosition[2],
    side,
  );
}

export function get_voxel_octree_position_1d_from_voxel_position_1d(
  voxelPosition: u32,
  side: u32,
): u32 {
  return math_floor(voxelPosition / side) * side;
}
