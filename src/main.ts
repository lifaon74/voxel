import { debugRayTrace } from './__debug/debug-raytrace';
import { debugTexture3d } from './__debug/debug-texture-3d';
import { debugVoxel } from './__debug/debug-voxel';

function main(): void {
  // debugVoxel();
  // debugTexture3d();
  debugRayTrace();
}

window.onload = main;
