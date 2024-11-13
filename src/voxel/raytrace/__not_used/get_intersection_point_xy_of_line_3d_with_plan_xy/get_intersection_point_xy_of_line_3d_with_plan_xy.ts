import { vec2 } from '@lifaon/math';
import { get_intersection_point_x_of_line_2d_with_axis_x } from '../get_intersection_point_x_with_x_axis/get_intersection_point_x_of_line_2d_with_axis_x';

/**
 * assumes: `v_z !== 0 <=> is_line_3d_intersecting_with_plan_xy`
 */
export function get_intersection_point_xy_of_line_3d_with_plan_xy(
  // line's origin
  o_x: number,
  o_y: number,
  o_z: number,
  // line's vector
  v_x: number,
  v_y: number,
  v_z: number,
): [p_x: number, p_y: number] {
  return [
    get_intersection_point_x_of_line_2d_with_axis_x(o_x, o_z, v_x, v_z),
    get_intersection_point_x_of_line_2d_with_axis_x(o_y, o_z, v_y, v_z),
  ];
}
