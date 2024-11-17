import { ObjectIn3dSpaceTrait } from '../object/object-in3d-space.trait';
import { LightSpectrum } from './types/light-spectrum';

export interface RadialLightIn3dSpaceTrait extends ObjectIn3dSpaceTrait {
  readonly spectrum: LightSpectrum;
  readonly position_in_ndc: LightSpectrum;
}
