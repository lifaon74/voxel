export function is_point_3d_inside_cube_or_its_surface(
  // point's position
  o_x: number,
  o_y: number,
  o_z: number,
  // cube's size
  side: number,
): boolean {
  return o_x >= 0 && o_x <= side && o_y >= 0 && o_y <= side && o_z >= 0 && o_z <= side;
}

export function is_point_3d_inside_cube(
  // point's position
  o_x: number,
  o_y: number,
  o_z: number,
  // cube's size
  side: number,
): boolean {
  return o_x > 0 && o_x < side && o_y > 0 && o_y < side && o_z > 0 && o_z < side;
}
