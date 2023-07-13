import { u32, u8 } from '@lifaon/math';
import { IVoxelOctreeCoordinates } from '../types/voxel-octree-coordinates.type';

/**
 * Works in voxel space (integer coordinates)
 * Converts an entry/exit point into the origin coordinates of a <voxelOctreeChild>
 */
export function convert_voxel_octree_coordinates_to_voxel_octree_child_coordinates(
  // the voxel_octree_coordinates point for the <voxelOctreeChild>
  out: IVoxelOctreeCoordinates,
  // the coordinates of the entry/exit point in the voxel space hitting the <voxelOctreeChild>
  voxelOctreeCoordinates: IVoxelOctreeCoordinates,
  // the side of the <voxelOctreeChild>
  side: u32,
): void {
  for (let i: u8 = 0; i < 3; i++) {
    out[i] = Math.floor(voxelOctreeCoordinates[i] / side) * side; // where the <voxelOctreeChild> is located
  }
  // const mask: number = ~(side - 1);
  // for (let i: number = 0; i < 3; i++) {
  //   voxelOctreeChildCoordinates[i] = voxelOctreeCoordinates[i] & mask;
  // }
}
