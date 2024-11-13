export function is_ray_2d_intersecting_with_axis_x(
  // ray's origin
  o_x: number,
  o_y: number,
  // ray's vector
  v_x: number,
  v_y: number,
): boolean {
  return (v_y > 0 && o_y <= 0 && v_y >= -o_y) || (v_y < 0 && o_y >= 0 && -v_y >= o_y);
}
