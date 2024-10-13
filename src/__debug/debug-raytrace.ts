import {
  mat4,
  mat4_create,
  mat4_invert,
  mat4_multiply,
  mat4_translate,
  vec3_create,
  vec3_create_u32,
  vec3_from_values,
  vec3_u32,
} from '@lifaon/math';
import { createAnimationFrameLoop, createEventListener } from '@lirx/utils';
import { FreeViewMatrix } from '../camera/free-camera';
import { create_canvas_context } from '../draw-voxels/create_canvas_context';
import { display_voxel_octree_slice } from '../draw-voxels/display_voxel_octree_slice';
import { slice_octree_using_read_voxel } from '../draw-voxels/slice/slice_octree_using_read_voxel';
import { Camera } from '../objects/camera/camera.class';
import { IReadonlyLightSpectrum } from '../objects/light/light-spectrum.type';
import { Light } from '../objects/light/light.class';
import { IRadialLightIn3dSpace } from '../objects/light/radial-light-in-3d-space.type';
import { Scene } from '../objects/scene/scene.class';
import { IVoxelOctreeIn3dSpace } from '../objects/voxel-octree/voxel-octree-in-3d-space.type';
import { VoxelOctree } from '../objects/voxel-octree/voxel-octree.class';
import { render_voxel_octrees_and_lights_in_image_data_using_cpu } from '../render/functions/render_voxel_octrees_and_lights_in_image_data_using_cpu';
import { draw_texture_3d_into_set_voxel_color_function } from '../voxel/generate/built-in/draw/draw_texture_3d_into_set_voxel_color_function';
import { allocate_and_write_voxel_material_in_memory } from '../voxel/material/functions/allocate/allocate_and_write_voxel_material_in_memory';
import { create_memory_alloc_function } from '../voxel/memory/functions/alloc/create_memory_alloc_function';
import { create_memory_from_size } from '../voxel/memory/functions/create/create_memory_from_size';
import { print_dynamic_memory } from '../voxel/memory/functions/print/print_dynamic_memory';
import { IMemoryAddress } from '../voxel/memory/types/memory-address.type';
import { allocate_and_write_voxel_octree_in_memory } from '../voxel/octree/functions/allocate/allocate_and_write_voxel_octree_in_memory';
import {
  voxel_octree_side_to_depth,
  voxel_octree_side_to_depth_loose,
} from '../voxel/octree/functions/depth-side/voxel_octree_side_to_depth';
import { allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position } from '../voxel/octree/functions/voxel-material/at-position/allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position';
import { NO_MATERIAL } from '../voxel/octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../voxel/raytrace/functions/get_intersection_point_3d_of_ray_3d_with_voxel_octree';
import { load_vox_file_url_as_texture_3d } from '../voxel/vox-file/load-and-save/load/load_vox_file_url_as_texture_3d';
import { generateRainbowVoxelOctree } from './generate/generate-rainbow-voxel-octree';

// MVP => https://jsantell.com/model-view-projection/#:~:text=The%20model%2C%20view%2C%20and%20projection,coordinates%20via%20implicit%20perspective%20division.
// NDC => https://carmencincotti.com/2022-05-02/homogeneous-coordinates-clip-space-ndc/

/*
 https://testbook.com/maths/matrix-multiplication#:~:text=Matrix%20Multiplication%20by%20Scalar%20Quantity&text=Formula%20and%20notation%20for%20scalar,scalar%20multiplication%20of%20the%20matrices.
http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/

 Matrix:
   Commutative Property: AB≠BA (Matrix multiplication is generally not commutative).
   Associative Property: (AB)C=A(BC), (Matrix multiplication is Associative in Nature).
   Distributive Property: A(B+C)=AB+AC, (Distributive law).
   Multiplicative Identity Property: IA=A=AI, where I is the identity matrix for matrix multiplication.
   Product with Scalar: x(AB)=(xA)B=A(Bx), such that x is a scalar.
   Transpose of product of matrices: (AB)T=BTAT
   , where T denotes the transpose of a matrix.
   If AB=AC≠B=C
   ,(Cancellation law is not applicable).
   Complex conjugate in the multiplication of 2 matrices is written as; (AB)∗=B∗A∗
   .
   If AB=0, it does not mean that A=0 or B=0.
   The product of two non-zero matrices may be a zero matrix.

 Inverse:
   (A^-1)^-1 = A
   (A*B)^-1 = B^-1 * A^-1
  */

export function render_scene_in_image_data_using_cpu(
  imageData: ImageData,
  scene: Scene,
): ImageData {
  const vp: mat4 = mat4_multiply(
    mat4_create(),
    scene.camera.projectionMatrix,
    scene.camera.viewMatrix,
  );

  return render_voxel_octrees_and_lights_in_image_data_using_cpu(
    imageData,
    scene.voxelOctrees.map((voxelOctree: VoxelOctree): IVoxelOctreeIn3dSpace => {
      const mvp: mat4 = mat4_create();
      const mvpi: mat4 = mat4_create();

      mat4_multiply(mvp, vp, voxelOctree.matrix);
      mat4_invert(mvpi, mvp);

      return {
        memory: voxelOctree.memory,
        address: voxelOctree.address,
        depth: voxelOctree.depth,
        mvp,
        mvpi,
      };
    }),
    scene.lights.map((light: Light): IRadialLightIn3dSpace => {
      const mvp: mat4 = mat4_create();
      const mvpi: mat4 = mat4_create();

      mat4_multiply(mvp, vp, light.matrix);
      mat4_invert(mvpi, mvp);

      return {
        spectrum: light.spectrum,
        mvp,
        mvpi,
      };
    }),
    scene.ambientLightSpectrum,
  );
}

function debugRayTrace1() {
  const memory = create_memory_from_size(2 ** 30 - 1);
  const alloc = create_memory_alloc_function(memory);

  const voxelOctreeDepth = voxel_octree_side_to_depth(16);
  const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(memory, alloc, NO_MATERIAL);

  console.time('gen');
  generateRainbowVoxelOctree(memory, alloc, voxelOctreeAddress, voxelOctreeDepth);
  console.timeEnd('gen');

  print_dynamic_memory(memory, alloc);
  display_voxel_octree_slice(
    memory,
    voxelOctreeAddress,
    voxelOctreeDepth,
    slice_octree_using_read_voxel(0),
  );

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

async function debugRayTrace2() {
  /* CREATE VOXELS */

  const memory = create_memory_from_size(2 ** 30 - 1);
  const alloc = create_memory_alloc_function(memory);

  const createRainbowVoxelOctree = (side: number): VoxelOctree => {
    const voxelOctreeDepth = voxel_octree_side_to_depth(side);
    const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(
      memory,
      alloc,
      NO_MATERIAL,
    );

    generateRainbowVoxelOctree(memory, alloc, voxelOctreeAddress, voxelOctreeDepth);

    return new VoxelOctree({
      memory,
      address: voxelOctreeAddress,
      depth: voxelOctreeDepth,
    });
  };

  const createAlienBotVoxelOctree = async (): Promise<VoxelOctree> => {
    // const url = new URL('./samples/alien_bot1.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/anim/T-Rex.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu6-without-water.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu5.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu10.vox?raw', import.meta.url);
    const url = new URL('./samples/ephtracy/monument/monu16.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu9.vox?raw', import.meta.url);
    // const url = new URL('./samples/haunted_house.vox?raw', import.meta.url);
    // const url = new URL('./samples/treehouse.vox?raw', import.meta.url);
    const texture = await load_vox_file_url_as_texture_3d(url);

    const side = Math.max(texture.x, texture.y, texture.z);
    const voxelOctreeDepth = voxel_octree_side_to_depth_loose(side);
    const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(
      memory,
      alloc,
      NO_MATERIAL,
    );

    const POSITION: vec3_u32 = vec3_create_u32();

    draw_texture_3d_into_set_voxel_color_function(texture, (x, y, z, r, g, b, a) => {
      POSITION[0] = x;
      POSITION[1] = y;
      POSITION[2] = z;

      const voxelMaterialAddress: IMemoryAddress =
        a === 255 ?
          allocate_and_write_voxel_material_in_memory(memory, alloc, r, g, b)
        : NO_MATERIAL;

      allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
        memory,
        alloc,
        voxelOctreeAddress,
        voxelOctreeDepth,
        POSITION,
        voxelMaterialAddress,
      );
    });

    return new VoxelOctree({
      memory,
      address: voxelOctreeAddress,
      depth: voxelOctreeDepth,
    });
  };

  // const rainbowVoxelOctree = createRainbowVoxelOctree(16);
  const alienBotVoxelOctree = await createAlienBotVoxelOctree();

  print_dynamic_memory(memory, alloc);

  /* CREATE LIGHTS */

  // const ambient: number = 0;
  const ambient: number = 0.1;
  // const ambient: number = 0.5;
  // const ambient: number = 1;
  const ambientLightSpectrum: IReadonlyLightSpectrum = vec3_from_values(ambient, ambient, ambient);

  const sunLight = Light.fromRadius([1, 1, 1], 1000);
  mat4_translate(sunLight.matrix, sunLight.matrix, [-1000, -1000, 1000]);

  const spotLight0 = Light.fromRadius([1, 1, 1], 16);
  mat4_translate(spotLight0.matrix, spotLight0.matrix, [64.5, 64.5, 64.5]);

  const spotLight1 = Light.fromRadius([1, 1, 1], 1000);
  mat4_translate(spotLight1.matrix, spotLight1.matrix, [-2000, -1000, 1000]);

  const spotLight2 = Light.fromRadius([1, 1, 1], 1000);
  mat4_translate(spotLight2.matrix, spotLight2.matrix, [-1000, -2000, 1000]);

  /* CREATE CAMERA */

  const camera = new Camera()
    .perspective(
      Math.PI / 2,
      1,
      1,
      // 20,
      5000,
      // Number.POSITIVE_INFINITY
    )
    .lookAt([-32, -32, 32], [0, 0, 0], [0, 0, 1]);
  // .lookAt(
  //   // camera is at [0, 0, -side], and look in direction [0, 0, 0] (up is Y axis)
  //   [0, 0, -32],
  //   [0, 0, 0],
  //   [0, -1, 0]
  // )
  const freeViewMatrix = new FreeViewMatrix({ translationSpeed: 5, rotationSpeed: 0.5 }).start();

  /* SCENE */

  const scene = new Scene({
    camera,
    ambientLightSpectrum,
    voxelOctrees: [
      // rainbowVoxelOctree,
      alienBotVoxelOctree,
    ],
    lights: [
      // sunLight,
      spotLight0,
      // spotLight1,
      // spotLight2,
    ],
  });

  /* RENDER */

  const windowSize = 256;

  const imageData = new ImageData(windowSize, windowSize);
  const ctx: CanvasRenderingContext2D = create_canvas_context(imageData.width, imageData.height, 2);

  const update = (): void => {
    // console.time('render');
    freeViewMatrix.update();
    mat4_multiply(camera.viewMatrix, freeViewMatrix.matrix, camera.viewMatrix);

    render_scene_in_image_data_using_cpu(imageData, scene);

    ctx.putImageData(imageData, 0, 0);
    // console.timeEnd('render');
  };

  const unsubscribe = createAnimationFrameLoop(update);

  createEventListener(window, 'keydown', (event: KeyboardEvent): void => {
    if (event.code === 'KeyC' && event.ctrlKey) {
      unsubscribe();
    }
  });
  // update();
}

/*--------------------------*/

export async function debugRayTrace() {
  // debugRayTrace1();
  debugRayTrace2();
}
