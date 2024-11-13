export function is_line_3d_intersecting_with_plan_xy(
  // line's origin
  o_x: number,
  o_y: number,
  o_z: number,
  // line's vector
  v_x: number,
  v_y: number,
  v_z: number,
): boolean {
  // steps:
  // return is_line_2d_intersecting_with_axis_x(o_x, o_z, v_x, v_z) && is_line_2d_intersecting_with_axis_x(o_y, o_z, v_y, v_z);
  // return v_z !== 0 && v_z !== 0;
  return v_z !== 0;
}
