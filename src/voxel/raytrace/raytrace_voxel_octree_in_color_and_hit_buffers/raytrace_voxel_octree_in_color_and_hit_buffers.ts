import {
  u16,
  u32,
  vec3,
  vec3_create,
  vec3_from_values,
  vec3_negate,
  vec3_normalize,
  vec3_set,
  vec3_transform_mat4,
  vec4_create,
  vec4_from_values,
  vec4_transform_mat4,
} from '@lifaon/math';
import { VoxelOctreeIn3dSpaceTrait } from '../../../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { NO_MATERIAL } from '../../octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../get_intersection_point_3d_of_ray_3d_with_voxel_octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';
import { ColorBuffer } from '../types/buffers/color-buffer';
import { HitBuffer } from '../types/buffers/hit-buffer';
import { NormalBuffer } from '../types/buffers/normal-buffer';

/*----*/

const RAY_START_POINT_IN_NDC_SPACE = vec3_create();
const RAY_END_POINT_IN_NDC_SPACE = vec3_create();
const RAY_HIT_POINT_IN_NDC_SPACE = vec3_create();
const NORMAL_VECTOR_IN_NDC_SPACE = vec3_create();

const RAY_START_POINT_IN_VOXEL_SPACE = vec3_create();
const RAY_END_POINT_IN_VOXEL_SPACE = vec3_create();
const RAY_HIT_POINT_IN_VOXEL_SPACE = vec3_create();
const NORMAL_VECTOR_IN_VOXEL_SPACE = vec3_create();

/*----*/

export function raytrace_voxel_octree_in_color_and_hit_buffers(
  // VOXEL_OCTREE
  voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait,
  // WINDOW'S SIZE
  width: u16,
  height: u16,
  // OUTPUTS
  colorBuffer: ColorBuffer,
  hitBuffer: HitBuffer,
  normalBuffer: NormalBuffer,
): void {
  const widthM1: u16 = width - 1;
  const heightM1: u16 = height - 1;

  const rayStartPointInNDCSpace: vec3 = vec3_set(RAY_START_POINT_IN_NDC_SPACE, 0, 0, 0);
  const rayEndPointInNDCSpace: vec3 = vec3_set(RAY_END_POINT_IN_NDC_SPACE, 0, 0, 1);
  const rayHitPointInNDCSpace: vec3 = RAY_HIT_POINT_IN_NDC_SPACE;
  const normalVectorInNDCSpace: vec3 = NORMAL_VECTOR_IN_NDC_SPACE;

  const rayStartPointInVoxelSpace: vec3 = RAY_START_POINT_IN_VOXEL_SPACE;
  const rayEndPointInVoxelSpace: vec3 = RAY_END_POINT_IN_VOXEL_SPACE;
  const rayHitPointInVoxelSpace: vec3 = RAY_HIT_POINT_IN_VOXEL_SPACE;
  const normalVectorInVoxelSpace: vec3 = NORMAL_VECTOR_IN_VOXEL_SPACE;

  let colorBufferIndex: u32 = 0;
  let hitBufferIndex: u32 = 0;
  let normalBufferIndex: u32 = 0;

  for (let y: u16 = 0; y < height; y++) {
    rayStartPointInNDCSpace[1] = rayEndPointInNDCSpace[1] = -((2 * y - heightM1) / height); // negate because y axis of Image data is opposite of viewport

    for (let x: u16 = 0; x < width; x++) {
      rayStartPointInNDCSpace[0] = rayEndPointInNDCSpace[0] = (2 * x - widthM1) / width;

      // computes ray's start point in voxel space
      vec3_transform_mat4(
        rayStartPointInVoxelSpace,
        rayStartPointInNDCSpace,
        voxelOctreeIn3dSpace.mvpi,
      );
      // computes ray's end point in voxel space
      vec3_transform_mat4(
        rayEndPointInVoxelSpace,
        rayEndPointInNDCSpace,
        voxelOctreeIn3dSpace.mvpi,
      );

      const voxelMaterialAddress: u32 = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
        rayStartPointInVoxelSpace,
        rayEndPointInVoxelSpace,
        voxelOctreeIn3dSpace.memory,
        voxelOctreeIn3dSpace.address,
        voxelOctreeIn3dSpace.depth,
        rayHitPointInVoxelSpace,
        normalVectorInVoxelSpace,
      );

      if (voxelMaterialAddress !== NO_MATERIAL) {
        vec3_transform_mat4(
          rayHitPointInNDCSpace,
          rayHitPointInVoxelSpace,
          voxelOctreeIn3dSpace.mvp,
        );

        if (rayHitPointInNDCSpace[2] < hitBuffer[hitBufferIndex + 2]) {
          colorBuffer[colorBufferIndex] = voxelOctreeIn3dSpace.memory.read_u8(voxelMaterialAddress);
          colorBuffer[colorBufferIndex + 1] = voxelOctreeIn3dSpace.memory.read_u8(
            voxelMaterialAddress + 1,
          );
          colorBuffer[colorBufferIndex + 2] = voxelOctreeIn3dSpace.memory.read_u8(
            voxelMaterialAddress + 2,
          );
          colorBuffer[colorBufferIndex + 3] = 0xff;

          hitBuffer[hitBufferIndex + 0] = rayHitPointInNDCSpace[0];
          hitBuffer[hitBufferIndex + 1] = rayHitPointInNDCSpace[1];
          hitBuffer[hitBufferIndex + 2] = rayHitPointInNDCSpace[2];

          vec3_transform_mat4(
            normalVectorInNDCSpace,
            normalVectorInVoxelSpace,
            voxelOctreeIn3dSpace.modelMatrix,
          );

          vec3_normalize(normalVectorInNDCSpace, normalVectorInNDCSpace);

          normalBuffer[normalBufferIndex + 0] = normalVectorInNDCSpace[0];
          normalBuffer[normalBufferIndex + 1] = normalVectorInNDCSpace[1];
          normalBuffer[normalBufferIndex + 2] = normalVectorInNDCSpace[2];
        }
      }

      colorBufferIndex += 4;
      hitBufferIndex += 3;
      normalBufferIndex += 3;
    }
  }
}
