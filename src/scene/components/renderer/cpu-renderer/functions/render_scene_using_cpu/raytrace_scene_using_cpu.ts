import { u32, u8, vec3, vec3_create, vec3_transform_mat4, vec4 } from '@lifaon/math';
import { ptr, ptr_create, ptr_get } from '../../../../../../misc/ptr';
import { NO_MATERIAL } from '../../../../../../voxel/octree/special-addresses.constant';
import { RadialLightIn3dSpaceTrait } from '../../../../../traits/light/radial-light-in-3d-space.trait';
import { LightSpectrum } from '../../../../../traits/light/types/light-spectrum';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees } from '../get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees/get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees';
import { render_lights_in_scene_using_cpu } from './render_lights_in_scene_using_cpu';

const RAY_HIT_POINT_IN_VOXEL_SPACE: vec3 = vec3_create();
const RAY_HIT_POINT_IN_NDC_SPACE: vec3 = vec3_create();
const HIT_NORMAL_VECTOR_IN_VOXEL_SPACE: vec3 = vec3_create();
const LIGHT_SPECTRUM: vec3 = vec3_create();
const VOXEL_OCTREE_INDEX: ptr<u8> = ptr_create<u8>(0xff);
const VOXEL_MATERIAL_ADDRESS: ptr<u32> = ptr_create<u32>(NO_MATERIAL);

export function raytrace_scene_using_cpu(
  // RAY
  rayStartPointInNDCSpace: vec3,
  rayEndPointInNDCSpace: vec3,
  // SCENE
  voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[],
  lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[],
  ambientLightSpectrum: LightSpectrum,
  // OUTPUTS
  outputColor: vec4,
): void {
  const rayHitPointInVoxelSpace: vec3 = RAY_HIT_POINT_IN_VOXEL_SPACE;
  const hitNormalVectorInVoxelSpace: vec3 = HIT_NORMAL_VECTOR_IN_VOXEL_SPACE;
  const hitVoxelOctreeIndex: ptr<u8> = VOXEL_OCTREE_INDEX;
  const hitVoxelMaterialAddress: ptr<u32> = VOXEL_MATERIAL_ADDRESS;

  // 1) get ray's hit point
  if (
    get_intersection_point_3d_of_ray_3d_with_many_voxel_octrees(
      rayStartPointInNDCSpace,
      rayEndPointInNDCSpace,
      voxelOctreesIn3dSpace,
      rayHitPointInVoxelSpace,
      hitNormalVectorInVoxelSpace,
      hitVoxelOctreeIndex,
      hitVoxelMaterialAddress,
    )
  ) {
    const voxelOctreeIn3dSpace: VoxelOctreeIn3dSpaceTrait =
      voxelOctreesIn3dSpace[ptr_get(hitVoxelOctreeIndex)];

    const rayHitPointInNDCSpace: vec3 = vec3_transform_mat4(
      RAY_HIT_POINT_IN_NDC_SPACE,
      rayHitPointInVoxelSpace,
      voxelOctreeIn3dSpace.mvp,
    );

    // 2) render lights
    const lightSpectrum: LightSpectrum = LIGHT_SPECTRUM;
    render_lights_in_scene_using_cpu(
      // RAY
      rayHitPointInVoxelSpace,
      rayHitPointInNDCSpace,
      hitNormalVectorInVoxelSpace,
      ptr_get(hitVoxelOctreeIndex),
      // SCENE
      voxelOctreesIn3dSpace,
      lightsIn3dSpace,
      ambientLightSpectrum,
      // OUTPUTS
      lightSpectrum,
    );

    // 3) assemble final color
    outputColor[0] =
      (voxelOctreeIn3dSpace.memory.read_u8(ptr_get(hitVoxelMaterialAddress)) / 255.0) *
      lightSpectrum[0];
    outputColor[1] =
      (voxelOctreeIn3dSpace.memory.read_u8(ptr_get(hitVoxelMaterialAddress) + 1) / 255.0) *
      lightSpectrum[1];
    outputColor[2] =
      (voxelOctreeIn3dSpace.memory.read_u8(ptr_get(hitVoxelMaterialAddress) + 2) / 255.0) *
      lightSpectrum[2];
    outputColor[3] = 1;
  } else {
    outputColor[3] = 0;
  }
}
