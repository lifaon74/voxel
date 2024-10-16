import { make_point_invalid, u32, u8, vec3, vec3_create, vec3_subtract } from '@lifaon/math';

/**
 * Returns the entry point of a ray in a cube.
 *  - assumes the cube has no transformation (no translation nor rotation)
 */
export function get_entry_point_3d_of_ray_3d_with_cube(
  // the entry point
  out: vec3,
  // RAY
  rayStartPoint: vec3,
  rayEndPoint: vec3,
  // CUBE SIZE
  side: u32,
): vec3 {
  let a: u8, b: u8, c: u8;

  const rayVector: vec3 = vec3_create();
  vec3_subtract(rayVector, rayEndPoint, rayStartPoint);

  // 1) checks if the ray may hit the cube
  for (a = 0; a < 3; a++) {
    // for each surface (by axis) of the cube
    b = (a + 1) % 3;
    c = (a + 2) % 3;

    if (rayVector[a] !== 0) {
      // if the ray is not parallel to this surface
      if (
        rayVector[a] > 0 ?
          // the ray's direction is toward the surface on "zero"
          rayStartPoint[a] >= side || // if the ray's start point is after the exit surface
          rayEndPoint[a] <= 0 // if the ray's end point is before the enter surface
          // the ray's direction is toward the surface on "side"
        : rayStartPoint[a] <= 0 || // if the ray's start point is after the exit surface
          rayEndPoint[a] >= side // if the ray's end point is before the enter surface
      ) {
        make_point_invalid(out);
        return out;
      }
    }
  }

  // 2) checks the ray's hit point if any
  for (a = 0; a < 3; a++) {
    // for each surface (by axis) of the cube
    b = (a + 1) % 3;
    c = (a + 2) % 3;

    if (rayVector[a] !== 0) {
      // if the ray is not parallel to this surface
      out[a] =
        rayVector[a] > 0 ?
          // the ray's direction is toward the surface on "zero"
          rayStartPoint[a] > 0 ?
            rayStartPoint[a] // in the cube
          : 0 // on the surface
          // the ray's direction is toward the surface on "side"
        : rayStartPoint[a] < side ?
          rayStartPoint[a] // in the cube
        : side; // on the surface

      out[b] = rayStartPoint[b] + (out[a] - rayStartPoint[a]) * (rayVector[b] / rayVector[a]); // thales

      if (
        (0 < out[b] || (out[b] === 0 && rayVector[b] >= 0)) &&
        (out[b] < side || (out[b] === side && rayVector[b] < 0)) // out[b] inside or next step inside
      ) {
        out[c] = rayStartPoint[c] + (out[a] - rayStartPoint[a]) * (rayVector[c] / rayVector[a]); // thales

        if (
          (0 < out[c] || (out[c] === 0 && rayVector[c] >= 0)) &&
          (out[c] < side || (out[c] === side && rayVector[c] < 0)) // out[c] inside or next step inside
        ) {
          return out;
        }
      }
    }
  }

  make_point_invalid(out);
  return out;
}
