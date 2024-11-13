import { f32, math_floor, u16, u32, vec3, vec3_u32 } from '@lifaon/math';

/**
 * Returns a point in the voxel space (with integer coordinates), computed from a ray hit point (with decimal coordinates).
 */
export function get_voxel_position_3d_from_ray_hit_point_3d(
  rayHitPoint: vec3,
  rayStartPoint: vec3,
  rayEndPoint: vec3,
  // OUTPUTS
  voxelPosition: vec3_u32,
): void {
  voxelPosition[0] = get_voxel_position_1d_from_ray_hit_point_1d(
    rayHitPoint[0],
    rayStartPoint[0],
    rayEndPoint[0],
  );
  voxelPosition[1] = get_voxel_position_1d_from_ray_hit_point_1d(
    rayHitPoint[1],
    rayStartPoint[1],
    rayEndPoint[1],
  );
  voxelPosition[2] = get_voxel_position_1d_from_ray_hit_point_1d(
    rayHitPoint[2],
    rayStartPoint[2],
    rayEndPoint[2],
  );
}

export function get_voxel_position_1d_from_ray_hit_point_1d(
  rayHitPoint: f32,
  rayStartPoint: f32,
  rayEndPoint: f32,
): u16 {
  const p: u32 = math_floor(rayHitPoint); // cast from f32 to u32
  if (rayEndPoint < rayStartPoint && p === rayHitPoint) {
    return p - 1;
  } else {
    return p;
  }
}
