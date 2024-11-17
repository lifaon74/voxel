import { make_point_invalid, u32, u8, vec3, vec3_create, vec3_subtract } from '@lifaon/math';

/**
 * Returns the exit point of a ray from a cube.
 *  - assumes the cube has no transformation (no translation nor rotation)
 *  TODO improve to consider endPoint
 */
export function get_exit_point_3d_of_ray_3d_with_cube(
  // the exit point
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

  for (a = 0; a < 3; a++) {
    // for each surface (by axis) of the cube
    b = (a + 1) % 3;
    c = (a + 2) % 3;

    if (rayVector[a] !== 0) {
      // if the ray is not parallel to this surface
      if (rayVector[a] > 0) {
        if (rayStartPoint[a] > side) {
          // point after exit surface
          break;
        } else {
          out[a] = side;
        }
      } else {
        // if (rayVector[a] < 0)
        if (rayStartPoint[a] < 0) {
          // point after exit surface
          break;
        } else {
          out[a] = 0;
        }
      }

      out[b] = rayStartPoint[b] + (out[a] - rayStartPoint[a]) * (rayVector[b] / rayVector[a]); // thales

      if (0 <= out[b] && out[b] <= side) {
        out[c] = rayStartPoint[c] + (out[a] - rayStartPoint[a]) * (rayVector[c] / rayVector[a]); // thales

        if (0 <= out[c] && out[c] <= side) {
          return out;
        }
      }
    }
  }

  make_point_invalid(out);
  return out;
}
