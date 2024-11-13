export function is_line_2d_intersecting_with_axis_x(
  // line's origin
  o_x: number,
  o_y: number,
  // line's vector
  v_x: number,
  v_y: number,
): boolean {
  return v_y !== 0;
}
