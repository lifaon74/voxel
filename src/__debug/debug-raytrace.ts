import {
  mat4,
  mat4_create,
  mat4_invert,
  mat4_multiply,
  mat4_translate,
  u8,
  vec3_create,
  vec3_from_values,
} from '@lifaon/math';
import { createAnimationFrameLoop, createEventListener } from '@lirx/utils';
import { FreeViewMatrix } from '../camera/free-camera';
import { load_vox_file_url_as_texture_3d } from '../formats/vox-file/load-and-save/load/load_vox_file_url_as_texture_3d';
import { create_canvas_context } from '../image/canvas/create_canvas_context';
import { draw_image_data } from '../image/canvas/draw_image_data';
import { LinearDynamicMemory } from '../memory/shared/dynamic/linear-dynamic-memory';
import { Camera } from '../objects/camera/camera.class';
import { IReadonlyLightSpectrum } from '../objects/light/light-spectrum.type';
import { Light } from '../objects/light/light.class';
import { IRadialLightIn3dSpace } from '../objects/light/radial-light-in-3d-space.type';
import { Scene } from '../objects/scene/scene.class';
import { IVoxelOctreeIn3dSpace } from '../objects/voxel-octree/voxel-octree-in-3d-space.type';
import { VoxelOctreeIn3DSpace } from '../objects/voxel-octree/voxel-octree.class';
import { render_voxel_octrees_and_lights_in_image_data_using_cpu } from '../render/functions/render_voxel_octrees_and_lights_in_image_data_using_cpu';
import { draw_rainbow_cube_into_texture_3d } from '../texture/operations/draw/draw_rainbow_cube_into_texture_3d';
import { Texture3D } from '../texture/texture-3d/texture-3d';
import { read_voxel_material } from '../voxel/material/read-write/read_voxel_material';
import { NO_MATERIAL } from '../voxel/octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../voxel/raytrace/voxel-octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';
import { VoxelOctree } from '../voxel/texture-3d/voxel-octree';

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
    scene.voxelOctrees.map((voxelOctree: VoxelOctreeIn3DSpace): IVoxelOctreeIn3dSpace => {
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

// function debugRayTrace1() {
//   // const memory = create_bytes_buffer(2 ** 30 - 1);
//   // const alloc = create_simple_alloc_function(memory);
//   //
//   // const voxelOctreeDepth = voxel_octree_side_to_depth(16);
//   // const voxelOctreeAddress = new_voxel_octree(memory, alloc, NO_MATERIAL);
//   //
//   // console.time('gen');
//   // generateRainbowVoxelOctree(memory, alloc, voxelOctreeAddress, voxelOctreeDepth);
//   // console.timeEnd('gen');
//   //
//   // print_dynamic_memory(memory, alloc);
//   // display_voxel_octree_slice(
//   //   memory,
//   //   voxelOctreeAddress,
//   //   voxelOctreeDepth,
//   //   slice_octree_using_read_voxel(0),
//   // );
//   //
//   // const out = vec3_create();
//   // const material = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
//   //   out,
//   //   vec3_from_values(0.5, 0.5, -0.5),
//   //   vec3_from_values(0, 0, 1),
//   //   memory,
//   //   voxelOctreeAddress,
//   //   voxelOctreeDepth,
//   // );
//   //
//   // console.log(out);
//   //
//   // if (material !== NO_MATERIAL) {
//   //   console.log(memory[material], memory[material + 1], memory[material + 2]);
//   // }
// }

function debugRayTrace1() {
  const side: u8 = 16;

  console.time('gen');
  const texture = VoxelOctree.create(side, side, side);
  // const texture = Texture3D.create(side, side, side);
  draw_rainbow_cube_into_texture_3d(texture);
  console.timeEnd('gen');

  texture.memory.print();

  draw_image_data(texture.toImageData(), 8);

  const x: number = 1.5;
  const y: number = 0.5;
  const z: number = -0.5;
  const dz: number = 0.2;

  const out = vec3_create();

  const material = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
    out,
    vec3_from_values(x, y, z),
    vec3_from_values(x, y, z + dz),
    texture.memory,
    texture.address,
    texture.depth,
  );

  console.log(out);

  if (material !== NO_MATERIAL) {
    console.log(material);
    console.log(read_voxel_material(texture.memory, material));
  }
}

async function debugRayTrace2() {
  /* CREATE VOXELS */

  // const createRainbowVoxelOctree = (side: number): VoxelOctreeIn3DSpace => {
  //   const voxelOctreeDepth = voxel_octree_side_to_depth(side);
  //   const voxelOctreeAddress = new_voxel_octree(memory, alloc, NO_MATERIAL);
  //
  //   generateRainbowVoxelOctree(memory, alloc, voxelOctreeAddress, voxelOctreeDepth);
  //
  //   return new VoxelOctreeIn3DSpace({
  //     memory,
  //     address: voxelOctreeAddress,
  //     depth: voxelOctreeDepth,
  //   });
  // };

  const importVoxelOctree = async (): Promise<VoxelOctreeIn3DSpace> => {
    // const url = new URL('./samples/alien_bot1.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/anim/T-Rex.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu6-without-water.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu5.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu10.vox?raw', import.meta.url);
    const url = new URL('../../assets/vox/ephtracy/monument/monu16.vox?raw', import.meta.url);
    // const url = new URL(
    //   '../../assets/tilesets/templates/floors/pavers_06.vox?raw',
    //   import.meta.url,
    // );
    // const url = new URL('./samples/ephtracy/monument/monu9.vox?raw', import.meta.url);
    // const url = new URL('./samples/haunted_house.vox?raw', import.meta.url);
    // const url = new URL('./samples/treehouse.vox?raw', import.meta.url);
    const texture: VoxelOctree<LinearDynamicMemory> = await load_vox_file_url_as_texture_3d<
      VoxelOctree<LinearDynamicMemory>
    >(url, VoxelOctree);

    return new VoxelOctreeIn3DSpace(texture);
  };

  // const rainbowVoxelOctree = createRainbowVoxelOctree(16);
  const importedVoxelOctree = await importVoxelOctree();
  // const importedVoxelOctree2 = await importVoxelOctree();
  // mat4_translate(importedVoxelOctree2.matrix, importedVoxelOctree2.matrix, [32, 0, 0]);

  // print_dynamic_memory(importedVoxelOctree.memory as any);

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
      importedVoxelOctree,
    ],
    lights: [
      sunLight,
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
  debugRayTrace1();
  // debugRayTrace2();
}
