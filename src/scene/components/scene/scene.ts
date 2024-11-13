import { vec3_from_values } from '@lifaon/math';
import { LightSpectrum } from '../../traits/light/types/light-spectrum';
import { Camera } from '../camera/camera';
import { Light } from '../light/light';
import { VoxelOctreeIn3DSpace } from '../voxel-octree/voxel-octree-in-3d-space';

export interface SceneOptions {
  readonly camera: Camera;
  readonly voxelOctrees?: VoxelOctreeIn3DSpace[];
  readonly lights?: Light[];
  readonly ambientLightSpectrum?: LightSpectrum;
}

export class Scene {
  readonly camera: Camera;
  readonly voxelOctrees: VoxelOctreeIn3DSpace[];
  readonly lights: Light[];
  readonly ambientLightSpectrum: LightSpectrum;

  constructor({
    camera,
    voxelOctrees = [],
    lights = [],
    ambientLightSpectrum = vec3_from_values(1, 1, 1),
  }: SceneOptions) {
    this.camera = camera;
    this.voxelOctrees = voxelOctrees;
    this.lights = lights;
    this.ambientLightSpectrum = ambientLightSpectrum;
  }
}
