import { readonly_mat4, vec3 } from '@lifaon/math';

export function vec3_transform_mat4_z(a: vec3, m: readonly_mat4): number {
  // vec3.transformMat4(vec3.create(), a, m)[2];
  let x = a[0],
    y = a[1],
    z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  return (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
}
