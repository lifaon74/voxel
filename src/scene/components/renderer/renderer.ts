import { mat4, mat4_create, mat4_invert, mat4_multiply } from '@lifaon/math';
import { def } from '../../../voxel/raytrace/raytrace_voxel_octree_in_color_and_hit_buffers/raytrace_voxel_octree_in_color_and_hit_buffers_a';

import { raytrace_voxel_octrees_in_color_and_hit_buffers } from '../../../voxel/raytrace/raytrace_voxel_octree_in_color_and_hit_buffers/raytrace_voxel_octrees_in_color_and_hit_buffers';
import { HitBuffer } from '../../../voxel/raytrace/types/buffers/hit-buffer';
import { LightBuffer } from '../../../voxel/raytrace/types/buffers/light-buffer';
import { NormalBuffer } from '../../../voxel/raytrace/types/buffers/normal-buffer';
import { RadialLightIn3dSpaceTrait } from '../../traits/light/radial-light-in-3d-space.trait';
import { RendererTrait } from '../../traits/renderer/renderer.trait';
import { VoxelOctreeIn3dSpaceTrait } from '../../traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { Light } from '../light/light';
import { Scene } from '../scene/scene';
import { VoxelOctreeIn3DSpace } from '../voxel-octree/voxel-octree-in-3d-space';

export class ImageDataCPURenderer implements RendererTrait {
  readonly imageData: ImageData;
  readonly #hitBuffer: HitBuffer;
  readonly #normalBuffer: NormalBuffer;
  readonly #lightBuffer: LightBuffer;

  constructor(imageData: ImageData) {
    this.imageData = imageData;
    this.#hitBuffer = new Float32Array(imageData.width * imageData.height * 3);
    this.#normalBuffer = new Float32Array(imageData.width * imageData.height * 3);
    this.#lightBuffer = new Float32Array(imageData.width * imageData.height * 3);
  }

  clear(): void {
    this.imageData.data.fill(0);
    this.#hitBuffer.fill(Number.POSITIVE_INFINITY);
    this.#normalBuffer.fill(0);
    this.#lightBuffer.fill(0);
  }

  render(scene: Scene): void {
    this.clear();

    const vp: mat4 = mat4_multiply(
      mat4_create(),
      scene.camera.projectionMatrix,
      scene.camera.viewMatrix,
    );

    const voxelOctreesIn3dSpace: readonly VoxelOctreeIn3dSpaceTrait[] = scene.voxelOctrees.map(
      (voxelOctree: VoxelOctreeIn3DSpace): VoxelOctreeIn3dSpaceTrait => {
        const mvp: mat4 = mat4_create();
        const mvpi: mat4 = mat4_create();

        mat4_multiply(mvp, vp, voxelOctree.matrix);
        mat4_invert(mvpi, mvp);

        return {
          memory: voxelOctree.memory,
          address: voxelOctree.address,
          depth: voxelOctree.depth,
          modelMatrix: voxelOctree.matrix,
          mvp,
          mvpi,
        };
      },
    );

    const lightsIn3dSpace: readonly RadialLightIn3dSpaceTrait[] = scene.lights.map(
      (light: Light): RadialLightIn3dSpaceTrait => {
        const mvp: mat4 = mat4_create();
        const mvpi: mat4 = mat4_create();

        mat4_multiply(mvp, vp, light.matrix);
        mat4_invert(mvpi, mvp);

        return {
          spectrum: light.spectrum,
          modelMatrix: light.matrix,
          mvp,
          mvpi,
        };
      },
    );

    raytrace_voxel_octrees_in_color_and_hit_buffers(
      voxelOctreesIn3dSpace,
      this.imageData.width,
      this.imageData.height,
      this.imageData.data,
      this.#hitBuffer,
      this.#normalBuffer,
    );

    def(
      this.#hitBuffer,
      this.#normalBuffer,
      lightsIn3dSpace,
      scene.ambientLightSpectrum,
      voxelOctreesIn3dSpace,
      this.#lightBuffer,
    );

    for (let i: number = 0, j = 0; i < this.#lightBuffer.length; i += 3, j += 4) {
      this.imageData.data[j] *= this.#lightBuffer[i];
      this.imageData.data[j + 1] *= this.#lightBuffer[i + 1];
      this.imageData.data[j + 2] *= this.#lightBuffer[i + 2];
    }
  }
}
