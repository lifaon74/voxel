import {
  mat4,
  mat4_create,
  mat4_invert,
  mat4_multiply,
  u16,
  u32,
  vec3,
  vec3_create,
  vec3_set,
  vec4,
  vec4_create,
} from '@lifaon/math';
import { null_vec3_transform_mat4 } from '../../../../../../functions/null_vec3_transform_mat4';
import { RadialLightIn3dSpaceTrait } from '../../../../../traits/light/radial-light-in-3d-space.trait';
import { VoxelOctreeIn3dSpaceTrait } from '../../../../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { Light } from '../../../../light/light';
import { Scene } from '../../../../scene/scene';
import { VoxelOctreeIn3DSpace } from '../../../../voxel-octree/voxel-octree-in-3d-space';
import { raytrace_scene_using_cpu } from './raytrace_scene_using_cpu';

const RAY_START_POINT_IN_NDC_SPACE: vec3 = vec3_create();
const RAY_END_POINT_IN_NDC_SPACE: vec3 = vec3_create();
const COLOR: vec4 = vec4_create();

export function render_scene_using_cpu(scene: Scene, imageData: ImageData): void {
  // 1) computes the objects' position in the scene
  const vp: mat4 = mat4_multiply(
    mat4_create(),
    scene.camera.projectionMatrix,
    scene.camera.viewMatrix,
  );

  const voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[] = scene.voxelOctrees.map(
    (voxelOctree: VoxelOctreeIn3DSpace): VoxelOctreeIn3dSpaceTrait => {
      const mvp: mat4 = mat4_multiply(mat4_create(), vp, voxelOctree.matrix);
      const mvpi: mat4 = mat4_invert(mat4_create(), mvp)!;

      return {
        memory: voxelOctree.memory,
        address: voxelOctree.address,
        depth: voxelOctree.depth,
        model_matrix: voxelOctree.matrix,
        mvp,
        mvpi,
      };
    },
  );

  const lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[] = scene.lights.map(
    (light: Light): RadialLightIn3dSpaceTrait => {
      const mvp: mat4 = mat4_multiply(mat4_create(), vp, light.matrix);
      const mvpi: mat4 = mat4_invert(mat4_create(), mvp)!;
      // accelerated because lightPointInLightSpace is static (0, 0, 0)
      const position_in_ndc: vec3 = null_vec3_transform_mat4(vec3_create(), mvp);

      return {
        spectrum: light.spectrum,
        model_matrix: light.matrix,
        position_in_ndc,
        mvp,
        mvpi,
      };
    },
  );

  const rayStartPointInNDCSpace: vec3 = vec3_set(RAY_START_POINT_IN_NDC_SPACE, 0, 0, 0);
  const rayEndPointInNDCSpace: vec3 = vec3_set(RAY_END_POINT_IN_NDC_SPACE, 0, 0, 1);
  const color: vec4 = COLOR;

  // 2) for each pixel in imageData
  const width: u16 = imageData.width;
  const height: u16 = imageData.height;
  const widthM1: u16 = width - 1;
  const heightM1: u16 = height - 1;
  const colorBuffer: Uint8ClampedArray = imageData.data;

  let i: u32 = 0;
  for (let y: u16 = 0; y < height; y++) {
    rayStartPointInNDCSpace[1] = rayEndPointInNDCSpace[1] = -((2 * y - heightM1) / height); // negate because y axis of Image data is opposite of viewport

    for (let x: u16 = 0; x < width; x++) {
      rayStartPointInNDCSpace[0] = rayEndPointInNDCSpace[0] = (2 * x - widthM1) / width;

      raytrace_scene_using_cpu(
        rayStartPointInNDCSpace,
        rayEndPointInNDCSpace,
        voxelOctreesIn3dSpace,
        lightsIn3dSpace,
        scene.ambientLightSpectrum,
        color,
      );

      colorBuffer[i] = color[0] * 255.0;
      colorBuffer[i + 1] = color[1] * 255.0;
      colorBuffer[i + 2] = color[2] * 255.0;
      colorBuffer[i + 3] = color[3] * 255.0;
      i += 4;
    }
  }
}
