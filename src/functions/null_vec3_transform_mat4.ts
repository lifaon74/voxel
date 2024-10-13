import { readonly_mat4, vec3 } from '@lifaon/math';

/**
 * This is a shortcut for `vec3_transform_mat4(out, vec3_from_values(0, 0, 0), m);`
 */
export function null_vec3_transform_mat4(out: vec3, m: readonly_mat4): vec3 {
  const w = m[15] || 1.0;
  out[0] = m[12] / w;
  out[1] = m[13] / w;
  out[2] = m[14] / w;
  return out;
}
