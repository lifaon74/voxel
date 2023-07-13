import { u32 } from '@lifaon/math';
import { draw_image_data } from '../../../draw-voxels/draw_image_data';
import { read_u8_from_memory } from '../../memory/functions/read-write/u8/read_u8_from_memory';
import { IMemoryAddress } from '../../memory/types/memory-address.type';
import { voxel_octree_depth_to_side } from '../../octree/functions/depth-side/voxel_octree_depth_to_side';
import { NO_MATERIAL } from '../../octree/special-addresses.constant';
import { Texture3D } from '../texture-3d.class';

export function convert_texture_3d_to_image_data_slices(
  texture3d: Texture3D,
): ImageData {
  return new ImageData(texture3d.data, texture3d.x, texture3d.y * texture3d.z);
}

// export function convert_texture_3d_to_image_data_slices(
//   texture3d: Texture3D,
// ): ImageData {
//   const img: ImageData = new ImageData(texture3d.x, texture3d.y * texture3d.z);
//
//   let i: u32 = 0;
//   for (let z: u32 = 0; z < texture3d.z; z++) {
//     for (let y: u32 = 0; y < texture3d.y; y++) {
//       for (let x: u32 = 0; x < texture3d.x; x++) {
//         img.data[i++] = read_u8_from_memory(memory, materialAddress);
//         img.data[i++] = read_u8_from_memory(memory, materialAddress + 1);
//         img.data[i++] = read_u8_from_memory(memory, materialAddress + 2);
//         img.data[i++] = 255;
//       }
//     }
//   }
//
//   return img;
// }

export function draw_texture_3d(
  texture3d: Texture3D,
): void {
  draw_image_data(convert_texture_3d_to_image_data_slices(texture3d));
}

