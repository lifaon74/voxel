import { VoxelOctree } from '../voxel-octree/voxel-octree.class';
import { Light } from '../light/light.class';
import { ILightSpectrum } from '../light/light-spectrum.type';
import { vec3_from_values } from '@lifaon/math';
import { Camera } from '../camera/camera.class';

export interface ISceneOptions {
  readonly camera: Camera,
  readonly voxelOctrees?: VoxelOctree[];
  readonly lights?: Light[];
  readonly ambientLightSpectrum?: ILightSpectrum;
}

export class Scene {
  camera: Camera;
  voxelOctrees: VoxelOctree[];
  lights: Light[];
  ambientLightSpectrum: ILightSpectrum;

  constructor(
    {
      camera,
      voxelOctrees = [],
      lights = [],
      ambientLightSpectrum = vec3_from_values(1, 1, 1),
    }: ISceneOptions,
  ) {
    this.camera = camera;
    this.voxelOctrees = voxelOctrees;
    this.lights = lights;
    this.ambientLightSpectrum = ambientLightSpectrum;
  }
}
