import { u16 } from '@lifaon/math';
import { VoxelOctreeIn3dSpaceTrait } from '../../../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { ColorBuffer } from '../types/buffers/color-buffer';
import { HitBuffer } from '../types/buffers/hit-buffer';
import { NormalBuffer } from '../types/buffers/normal-buffer';
import { raytrace_voxel_octree_in_color_and_hit_buffers } from './raytrace_voxel_octree_in_color_and_hit_buffers';

export function raytrace_voxel_octrees_in_color_and_hit_buffers(
  // VOXEL_OCTREES
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  // WINDOW'S SIZE
  width: u16,
  height: u16,
  // OUTPUTS
  colorBuffer: ColorBuffer,
  hitBuffer: HitBuffer,
  normalBuffer: NormalBuffer,
): void {
  for (let i: number = 0; i < voxelOctreesIn3dSpace.length; i++) {
    raytrace_voxel_octree_in_color_and_hit_buffers(
      voxelOctreesIn3dSpace[i],
      width,
      height,
      colorBuffer,
      hitBuffer,
      normalBuffer,
    );
  }
}
