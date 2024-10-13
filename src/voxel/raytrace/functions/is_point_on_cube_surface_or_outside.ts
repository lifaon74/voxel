import { u32, vec3 } from '@lifaon/math';

/**
 * Returns true if a point is on the surface of a cube or outside
 */
export function is_point_on_cube_surface_or_outside(point: vec3, side: u32): boolean {
  return (
    point[0] <= 0 ||
    point[0] >= side ||
    point[1] <= 0 ||
    point[1] >= side ||
    point[2] <= 0 ||
    point[2] >= side
  );
}
