import { mat4 } from '@lifaon/math';

export interface CameraTrait {
  readonly projectionMatrix: mat4;
  readonly viewMatrix: mat4;
}
