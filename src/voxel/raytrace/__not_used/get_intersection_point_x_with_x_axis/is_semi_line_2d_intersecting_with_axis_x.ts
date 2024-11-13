export function is_semi_line_2d_intersecting_with_axis_x(
  // semi-line's origin
  o_x: number,
  o_y: number,
  // semi-line's vector
  v_x: number,
  v_y: number,
): boolean {
  // return o_y >= 0 ? v_y < 0 : v_y > 0;
  return (v_y > 0 && o_y <= 0) || (v_y < 0 && o_y >= 0);
}
