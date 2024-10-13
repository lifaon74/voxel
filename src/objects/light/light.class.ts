import { mat4, mat4_create, vec3_create, vec3_scale } from '@lifaon/math';
import { readonly_vec3 } from '@lifaon/math/src/math-gl/vec3/vec3.type';
import { ILightSpectrum } from './light-spectrum.type';

export class Light {
  static fromRadius(
    color: readonly_vec3, // [0, 1]
    radius: number,
  ): Light {
    return new Light(vec3_scale(vec3_create(), color, radius * radius));
  }

  spectrum: ILightSpectrum;
  matrix: mat4;

  constructor(spectrum: ILightSpectrum) {
    this.spectrum = spectrum;
    this.matrix = mat4_create();
  }
}
