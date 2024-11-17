/**
 * assumes: `v_y !== 0 <=> is_line_2d_intersecting_with_axis_x`
 */
export function get_intersection_point_x_of_line_2d_with_axis_x(
  // line's origin
  o_x: number,
  o_y: number,
  // line's vector
  v_x: number,
  v_y: number,
): number {
  return o_x - (o_y * v_x) / v_y;
}
