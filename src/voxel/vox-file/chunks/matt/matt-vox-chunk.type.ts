import { f32, u32 } from '@lifaon/math';

export const enum MattVoxMaterialType {
  DIFFUSE = 0,
  METAL = 1,
  GLASS = 2,
  EMISSIVE = 3,
}

/**
 * @inheritDoc https://github.com/ephtracy/voxel-model/blob/8e53f3898952372967d1c1d57118423095c81a8f/MagicaVoxel-file-format-vox.txt#L120
 */
export interface IMattVoxChunk {
  readonly type: 'matt';
  readonly id: u32;
  readonly materialType: MattVoxMaterialType;
  readonly weight: f32;
  readonly propertyBits: u32;
  readonly propertyValues: Float32Array;
}
