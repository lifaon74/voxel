import { mat4 } from '@lifaon/math';

export interface ObjectIn3dSpaceTrait {
  readonly modelMatrix: mat4;
  readonly mvp: mat4;
  readonly mvpi: mat4;
}
