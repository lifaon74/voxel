import { mat4, mat4_create, readonly_vec3, vec3_create, vec3_scale } from '@lifaon/math';
import { LightSpectrum } from '../../traits/light/types/light-spectrum';

export class Light {
  static fromRadius(
    color: readonly_vec3, // [0, 1]
    radius: number,
  ): Light {
    return new Light(vec3_scale(vec3_create(), color, radius * radius));
  }

  readonly spectrum: LightSpectrum;
  readonly matrix: mat4;

  constructor(spectrum: LightSpectrum) {
    this.spectrum = spectrum;
    this.matrix = mat4_create();
  }
}
