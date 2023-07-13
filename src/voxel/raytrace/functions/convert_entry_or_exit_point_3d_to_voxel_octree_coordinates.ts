import { u8, vec3 } from '@lifaon/math';
import { IVoxelOctreeCoordinates } from '../types/voxel-octree-coordinates.type';

/**
 * Converts a point in a 3D space (with decimal coordinates) to a point in the voxel space (with integer coordinates)
 */
export function convert_entry_or_exit_point_3d_to_voxel_octree_coordinates(
  // the voxel_octree_coordinates point
  out: IVoxelOctreeCoordinates,
  // the entry/exit point
  point: vec3,
  rayVector: vec3,
): void {
  // intHitPosition[0] = hitPosition[0] - ((rayVector[0] < 0) ? Number.EPSILON : 0);
  // intHitPosition[1] = hitPosition[1] - ((rayVector[1] < 0) ? Number.EPSILON : 0);
  // intHitPosition[2] = hitPosition[2] - ((rayVector[2] < 0) ? Number.EPSILON : 0);
  for (let i: u8 = 0; i < 3; i++) {
    out[i] = point[i]; // cast from f32 to u16
    if (
      (rayVector[i] < 0)
      && (out[i] === point[i])
    ) {
      out[i]--;
    }
  }
}
