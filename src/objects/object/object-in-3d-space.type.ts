import { mat4 } from '@lifaon/math';

export interface IObjectIn3dSpace {
  readonly mvp: mat4;
  readonly mvpi: mat4;
}
