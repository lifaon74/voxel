export function is_ray_3d_intersecting_with_plan_xy(
  // ray's origin
  o_x: number,
  o_y: number,
  o_z: number,
  // ray's vector
  v_x: number,
  v_y: number,
  v_z: number,
): boolean {
  // steps:
  // return is_ray_2d_intersecting_with_axis_x(o_x, o_z, v_x, v_z) && is_ray_2d_intersecting_with_axis_x(o_y, o_z, v_y, v_z);
  return (v_z > 0 && o_z <= 0 && v_z >= -o_z) || (v_z < 0 && o_z >= 0 && -v_z >= o_z);
}
