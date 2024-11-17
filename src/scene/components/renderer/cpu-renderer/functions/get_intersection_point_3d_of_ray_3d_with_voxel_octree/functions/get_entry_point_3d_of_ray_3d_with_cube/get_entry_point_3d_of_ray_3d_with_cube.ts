import { u32, u8, vec3, vec3_create, vec3_subtract } from '@lifaon/math';

const RAY_VECTOR: vec3 = vec3_create();

/**
 * Computes the **entry** point of a ray in a cube:
 *
 *  - the cube is placed at (0, 0, 0) and "grows" on each axis with a side of `side`.
 *  - the function returns `true` if the ray is already strictly inside the cube, or if it "enters" this cube.
 *  - to "enter" in the cube, the ray has to hit the external surface of this cube, and the next step of this ray must be inside the cube.
 *    As a consequence, if the ray touches an edge or a corner of the cube, the function returns `true` only if the ray goes "inside" the cube.
 */
export function get_entry_point_3d_of_ray_3d_with_cube(
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
        return false;
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
      outputRayHitPoint[a] =
        rayVector[a] > 0 ?
          // the ray's direction is toward the surface on "zero"
          rayStartPoint[a] > 0 ?
            rayStartPoint[a] // in the cube
          : 0 // on the surface
          // the ray's direction is toward the surface on "side"
        : rayStartPoint[a] < side ?
          rayStartPoint[a] // in the cube
        : side; // on the surface

      outputRayHitPoint[b] =
        rayStartPoint[b] +
        (outputRayHitPoint[a] - rayStartPoint[a]) * (rayVector[b] / rayVector[a]); // thales
      // rayHitPoint[b] = rayStartPoint[b] * (rayEndPoint[a] - rayHitPoint[a]) + rayEndPoint[b] * (rayHitPoint[a] - rayStartPoint[a]);

      if (
        (0 < outputRayHitPoint[b] || (outputRayHitPoint[b] === 0 && rayVector[b] > 0)) &&
        (outputRayHitPoint[b] < side || (outputRayHitPoint[b] === side && rayVector[b] < 0)) // rayVector[b] inside or next step inside
      ) {
        outputRayHitPoint[c] =
          rayStartPoint[c] +
          (outputRayHitPoint[a] - rayStartPoint[a]) * (rayVector[c] / rayVector[a]); // thales

        if (
          (0 < outputRayHitPoint[c] || (outputRayHitPoint[c] === 0 && rayVector[c] > 0)) &&
          (outputRayHitPoint[c] < side || (outputRayHitPoint[c] === side && rayVector[c] < 0)) // rayVector[c] inside or next step inside
        ) {
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
