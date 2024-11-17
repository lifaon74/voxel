import { u32, u8, vec3, vec3_create, vec3_subtract } from '@lifaon/math';

const RAY_VECTOR: vec3 = vec3_create();

/**
 * Computes the **exit** point of a ray in a cube:
 *
 *  - the cube is placed at (0, 0, 0) and "grows" on each axis with a side of `side`.
 *  - the ray **MUST** have "entered" in the cube before.
 *  - the function returns `true` if the ray "exits" this cube:
 *    this should always be the case, except if the ray ends in the cube.
 */
export function get_exit_point_3d_of_ray_3d_with_cube(
  // RAY
  rayStartPoint: vec3,
  rayEndPoint: vec3,
  // CUBE
  side: u32,
  // OUTPUTS
  outputRayHitPoint: vec3,
  outputNormalVector: vec3,
): boolean {
  let a: u8, b: u8, c: u8;

  const rayVector: vec3 = vec3_subtract(RAY_VECTOR, rayEndPoint, rayStartPoint);

  // 1) checks if the ray ends in the cube
  if (
    0 <= rayEndPoint[0] &&
    rayEndPoint[0] <= side &&
    0 <= rayEndPoint[1] &&
    rayEndPoint[1] <= side &&
    0 <= rayEndPoint[2] &&
    rayEndPoint[2] <= side
  ) {
    return false;
  }

  // 2) checks the ray's exit point
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
          outputRayHitPoint[a] = side;
        }
      } /*if (rayVector[a] < 0) */ else {
        if (rayStartPoint[a] < 0) {
          // point after exit surface
          break;
        } else {
          outputRayHitPoint[a] = 0;
        }
      }

      outputRayHitPoint[b] =
        rayStartPoint[b] +
        (outputRayHitPoint[a] - rayStartPoint[a]) * (rayVector[b] / rayVector[a]); // thales

      if (0 <= outputRayHitPoint[b] && outputRayHitPoint[b] <= side) {
        outputRayHitPoint[c] =
          rayStartPoint[c] +
          (outputRayHitPoint[a] - rayStartPoint[a]) * (rayVector[c] / rayVector[a]); // thales

        if (0 <= outputRayHitPoint[c] && outputRayHitPoint[c] <= side) {
          outputNormalVector[a] = rayVector[a] > 0 ? -1 : 1;
          outputNormalVector[b] = 0;
          outputNormalVector[c] = 0;
          return true;
        }
      }
    }
  }

  return false;
}
