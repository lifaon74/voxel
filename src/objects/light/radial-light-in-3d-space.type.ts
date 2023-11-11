import { IObjectIn3dSpace } from '../object/object-in-3d-space.type';
import { ILightSpectrum } from './light-spectrum.type';

export interface IRadialLightIn3dSpace extends IObjectIn3dSpace {
  readonly spectrum: ILightSpectrum;
}

