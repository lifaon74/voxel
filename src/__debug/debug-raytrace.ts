import { u16, u32, u8, vec3, vec3_create, vec3_from_values, vec4, vec4_create } from '@lifaon/math';
import { create_canvas_context } from '../draw-voxels/create_canvas_context';
import { display_voxel_octree_slice } from '../draw-voxels/display_voxel_octree_slice';
import { slice_octree_using_read_voxel } from '../draw-voxels/slice/slice_octree_using_read_voxel';
import { create_memory_alloc_function } from '../voxel/memory/functions/alloc/create_memory_alloc_function';
import { create_memory_from_size } from '../voxel/memory/functions/create/create_memory_from_size';
import { print_dynamic_memory } from '../voxel/memory/functions/print/print_dynamic_memory';
import { IMemory } from '../voxel/memory/memory.type';
import { IMemoryAddress } from '../voxel/memory/types/memory-address.type';
import { allocate_and_write_voxel_octree_in_memory } from '../voxel/octree/functions/allocate/allocate_and_write_voxel_octree_in_memory';
import { voxel_octree_side_to_depth } from '../voxel/octree/functions/depth-side/voxel_octree_side_to_depth';
import { NO_MATERIAL } from '../voxel/octree/special-addresses.constant';
import {
  get_intersection_point_3d_of_ray_3d_with_voxel_octree,
} from '../voxel/raytrace/functions/get_intersection_point_3d_of_ray_3d_with_voxel_octree';
import { generateRainbowVoxelOctree } from './generate/generate-rainbow-voxel-octree';

function render(
  imageData: ImageData,
  // VOXEL_OCTREE
  memory: IMemory,
  voxelOctreeAddress: IMemoryAddress,
  voxelOctreeDepth: u8,
): ImageData {
  const pointAInClippingSpace: vec3 = vec3_from_values(0, 0, -1);
  const pointBInClippingSpace: vec3 = vec3_from_values(0, 0, 1);

  const width: u16 = imageData.width;
  const widthM1: u16 = width - 1;
  const height: u16 = imageData.height;
  const heightM1: u16 = height - 1;
  const hitPoint: vec3 = vec3_create();
  const color: vec4 = vec4_create();


  let i: u32 = 0;
  for (let y: u16 = 0; y < height; y++) {
    pointAInClippingSpace[1] = pointBInClippingSpace[1] = -(((2 * y) - heightM1) / height); // negate because y axis of Image data is opposite of viewport

    for (let x: u16 = 0; x < width; x++) {
      pointAInClippingSpace[0] = pointBInClippingSpace[0] = ((2 * x) - widthM1) / width;

      const material = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
        hitPoint,
        pointAInClippingSpace,
        pointBInClippingSpace,
        memory,
        voxelOctreeAddress,
        voxelOctreeDepth,
      );

      if (material === NO_MATERIAL) {
        color[0] = 0;
        color[1] = 0;
        color[2] = 0;
        color[3] = 0;
      } else {
        color[0] = memory[material] / 255;
        color[1] = memory[material + 1] / 255;
        color[2] = memory[material + 2] / 255;
        color[3] = 1;
      }

      imageData.data[i++] = color[0] * 255;
      imageData.data[i++] = color[1] * 255;
      imageData.data[i++] = color[2] * 255;
      imageData.data[i++] = color[3] * 255;
    }
  }

  return imageData;
}

function debugRayTrace1() {
  const memory = create_memory_from_size((2 ** 30) - 1);
  const alloc = create_memory_alloc_function(memory);

  const voxelOctreeDepth = voxel_octree_side_to_depth(2);
  const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(memory, alloc, NO_MATERIAL);

  console.time('gen');
  generateRainbowVoxelOctree(
    memory,
    alloc,
    voxelOctreeAddress,
    voxelOctreeDepth,
  );
  console.timeEnd('gen');

  print_dynamic_memory(memory, alloc);
  display_voxel_octree_slice(memory, voxelOctreeAddress, voxelOctreeDepth, slice_octree_using_read_voxel(0));

  const out = vec3_create();
  const material = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
    out,
    vec3_from_values(0.5, 0.5, -0.5),
    vec3_from_values(0, 0, 1),
    memory,
    voxelOctreeAddress,
    voxelOctreeDepth,
  );

  console.log(out);

  if (material !== NO_MATERIAL) {
    console.log(memory[material], memory[material + 1], memory[material + 2]);
  }
}

function debugRayTrace2() {
  const memory = create_memory_from_size((2 ** 30) - 1);
  const alloc = create_memory_alloc_function(memory);

  const voxelOctreeDepth = voxel_octree_side_to_depth(16);
  const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(memory, alloc, NO_MATERIAL);

  generateRainbowVoxelOctree(
    memory,
    alloc,
    voxelOctreeAddress,
    voxelOctreeDepth,
  );

  const windowSize = 256;

  const imageData = new ImageData(windowSize, windowSize);
  const ctx: CanvasRenderingContext2D = create_canvas_context(imageData.width, imageData.height);

  const update = () => {
    ctx.putImageData(render(imageData, memory, voxelOctreeAddress, voxelOctreeDepth), 0, 0);
  };

  update();
}

/*--------------------------*/

export async function debugRayTrace() {
  debugRayTrace1();
  debugRayTrace2();
}
