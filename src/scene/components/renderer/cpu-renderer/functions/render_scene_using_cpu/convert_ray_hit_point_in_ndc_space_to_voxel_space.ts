import { u32, u8, vec3, vec3_copy, vec3_create, vec3_transform_mat4 } from '@lifaon/math';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';

export function convert_ray_hit_point_in_ndc_space_to_voxel_space(
  // RAY
  rayHitPointInVoxelSpace: vec3,
  rayHitPointInNDCSpace: vec3,
  hitVoxelOctreeIndex: u8,
  // VOXEL_OCTREES
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
): readonly vec3[] {
  const rayHitPointsInInVoxelSpace: vec3[] = new Array<vec3>(voxelOctreesIn3dSpace.length);

  for (
    let voxelOctreeIndex: number = 0;
    voxelOctreeIndex < voxelOctreesIn3dSpace.length;
    voxelOctreeIndex++
  ) {
    rayHitPointsInInVoxelSpace[voxelOctreeIndex] = vec3_transform_mat4(
      vec3_create(),
      rayHitPointInNDCSpace,
      voxelOctreesIn3dSpace[voxelOctreeIndex].mvpi,
    );
  }

  vec3_copy(rayHitPointsInInVoxelSpace[hitVoxelOctreeIndex], rayHitPointInVoxelSpace);

  return rayHitPointsInInVoxelSpace;
}
