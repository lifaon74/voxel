import {
  mat4,
  mat4_create,
  mat4_look_at,
  mat4_perspective_webgpu,
  readonly_vec3,
} from '@lifaon/math';
import { CameraTrait } from '../../traits/camera/camera.trait';

export class Camera implements CameraTrait {
  readonly projectionMatrix: mat4;
  readonly viewMatrix: mat4;

  constructor() {
    this.projectionMatrix = mat4_create();
    this.viewMatrix = mat4_create();
  }

  perspective(
    fovy: number, // Vertical field of view in radians
    aspect: number, // Aspect ratio. typically viewport width/height
    near: number, // Near bound of the frustum
    far: number,
  ): this {
    mat4_perspective_webgpu(this.projectionMatrix, fovy, aspect, near, far);
    return this;
  }

  lookAt(eye: readonly_vec3, center: readonly_vec3, up: readonly_vec3): this {
    mat4_look_at(this.viewMatrix, eye, center, up);
    return this;
  }
}
