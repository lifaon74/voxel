import {
  mat4,
  mat4_create,
  mat4_identity,
  mat4_invert,
  mat4_multiply,
  mat4_rotate_y,
  mat4_rotate_z,
  mat4_translate,
  vec3_create,
  vec3_from_values,
} from '@lifaon/math';
import { createAnimationFrameLoop, createEventListener } from '@lirx/utils';
import { FreeViewMatrix } from '../camera/free-camera';
import { load_vox_file_url_as_texture_3d } from '../formats/vox-file/load-and-save/load/load_vox_file_url_as_texture_3d';
import { create_canvas_context } from '../image/canvas/create_canvas_context';
import { draw_image_data } from '../image/canvas/draw_image_data';
import { LinearDynamicMemory } from '../memory/shared/dynamic/linear-dynamic-memory';
import { render_voxel_octrees_and_lights_in_image_data_using_cpu } from '../render/functions/render_voxel_octrees_and_lights_in_image_data_using_cpu';
import { Camera } from '../scene/components/camera/camera';
import { Light } from '../scene/components/light/light';
import { ImageDataCPURenderer } from '../scene/components/renderer/renderer';
import { Scene } from '../scene/components/scene/scene';
import { VoxelOctreeIn3DSpace } from '../scene/components/voxel-octree/voxel-octree-in-3d-space';
import { RadialLightIn3dSpaceTrait } from '../scene/traits/light/radial-light-in-3d-space.trait';
import { ReadonlyLightSpectrum } from '../scene/traits/light/types/light-spectrum';
import { VoxelOctreeIn3dSpaceTrait } from '../scene/traits/voxel-octree/voxel-octree-in-3d-space.trait';
import { Texture2D } from '../texture/texture-2d/texture-2d';
import { NO_MATERIAL } from '../voxel/octree/special-addresses.constant';
import { get_intersection_point_3d_of_ray_3d_with_voxel_octree } from '../voxel/raytrace/get_intersection_point_3d_of_ray_3d_with_voxel_octree/get_intersection_point_3d_of_ray_3d_with_voxel_octree';
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

// export function render_scene_in_image_data_using_cpu(
//   imageData: ImageData,
//   scene: Scene,
// ): ImageData {
//   const vp: mat4 = mat4_multiply(
//     mat4_create(),
//     scene.camera.projectionMatrix,
//     scene.camera.viewMatrix,
//   );
//
//   return render_voxel_octrees_and_lights_in_image_data_using_cpu(
//     imageData,
//     scene.voxelOctrees.map((voxelOctree: VoxelOctreeIn3DSpace): VoxelOctreeIn3dSpaceTrait => {
//       const mvp: mat4 = mat4_create();
//       const mvpi: mat4 = mat4_create();
//
//       mat4_multiply(mvp, vp, voxelOctree.matrix);
//       mat4_invert(mvpi, mvp);
//
//       return {
//         memory: voxelOctree.memory,
//         address: voxelOctree.address,
//         depth: voxelOctree.depth,
//         mvp,
//         mvpi,
//       };
//     }),
//     scene.lights.map((light: Light): RadialLightIn3dSpaceTrait => {
//       const mvp: mat4 = mat4_create();
//       const mvpi: mat4 = mat4_create();
//
//       mat4_multiply(mvp, vp, light.matrix);
//       mat4_invert(mvpi, mvp);
//
//       return {
//         spectrum: light.spectrum,
//         mvp,
//         mvpi,
//       };
//     }),
//     scene.ambientLightSpectrum,
//   );
// }

async function debugRayTrace1() {
  console.time('gen');
  // const texture = VoxelOctree.create(16, 16, 16);
  // draw_rainbow_cube_into_texture_3d(texture);

  const texture: VoxelOctree<LinearDynamicMemory> = await load_vox_file_url_as_texture_3d<
    VoxelOctree<LinearDynamicMemory>
  >(new URL('../../assets/vox/ephtracy/monument/monu16.vox?raw', import.meta.url), VoxelOctree);
  console.timeEnd('gen');

  // texture.memory.print();

  // draw_image_data(texture.toImageData(), 8);

  // const test01 = (): void => {
  //   const x: number = 1.5;
  //   const y: number = 0.5;
  //   const z: number = -0.5;
  //   const dz: number = 0.2;
  //
  //   const out = vec3_create();
  //
  //   const material = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
  //     out,
  //     vec3_from_values(x, y, z),
  //     vec3_from_values(x, y, z + dz),
  //     texture.memory,
  //     texture.address,
  //     texture.depth,
  //   );
  //
  //   console.log(out);
  //
  //   if (material !== NO_MATERIAL) {
  //     console.log(material);
  //     console.log(read_voxel_material(texture.memory, material));
  //   }
  // };

  // const test02 = (): void => {
  //   const z0: number = 1000;
  //   const z1: number = -1000;
  //   const output = new Texture2D(texture.x, texture.y);
  //
  //   for (let y: number = 0; y < output.y; y++) {
  //     for (let x: number = 0; x < output.x; x++) {
  //       const [
  //         // point
  //         p_x,
  //         p_y,
  //         p_z,
  //         // normal
  //         n_x,
  //         n_y,
  //         n_z,
  //         // material
  //         voxelMaterialAddress,
  //       ] = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
  //         x,
  //         y,
  //         z0,
  //         x,
  //         y,
  //         z1,
  //         texture.memory,
  //         texture.address,
  //         texture.depth,
  //       );
  //
  //       if (voxelMaterialAddress !== NO_MATERIAL) {
  //         output.setColor(
  //           x,
  //           y,
  //           texture.memory.read_u8(voxelMaterialAddress),
  //           texture.memory.read_u8(voxelMaterialAddress + 1),
  //           texture.memory.read_u8(voxelMaterialAddress + 2),
  //           255,
  //         );
  //       }
  //     }
  //   }
  //
  //   draw_image_data(output.toImageData(), 8);
  // };

  const test02 = (): void => {
    const output = new Texture2D(texture.x, texture.y);

    const rayStartPoint = vec3_from_values(0, 0, 1000);
    const rayEndPoint = vec3_from_values(0, 0, -1000);
    const rayHitPoint = vec3_create();
    const normalVector = vec3_create();

    for (let y: number = 0; y < output.y; y++) {
      rayStartPoint[1] = y;
      rayEndPoint[1] = y;

      for (let x: number = 0; x < output.x; x++) {
        rayStartPoint[0] = x;
        rayEndPoint[0] = x;

        const voxelMaterialAddress = get_intersection_point_3d_of_ray_3d_with_voxel_octree(
          rayStartPoint,
          rayEndPoint,
          texture.memory,
          texture.address,
          texture.depth,
          rayHitPoint,
          normalVector,
        );

        if (voxelMaterialAddress !== NO_MATERIAL) {
          output.setColor(
            x,
            y,
            texture.memory.read_u8(voxelMaterialAddress),
            texture.memory.read_u8(voxelMaterialAddress + 1),
            texture.memory.read_u8(voxelMaterialAddress + 2),
            255,
          );
        }
      }
    }

    draw_image_data(output.toImageData(), 8);
  };

  // test01();
  test02();
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
    // const url = new URL('../../assets/vox/ephtracy/anim/T-Rex.vox?raw', import.meta.url);
    const url = new URL(
      '../../assets/vox/ephtracy/monument/monu6-without-water.vox?raw',
      import.meta.url,
    );
    // const url = new URL('./samples/ephtracy/monument/monu5.vox?raw', import.meta.url);
    // const url = new URL('./samples/ephtracy/monument/monu10.vox?raw', import.meta.url);
    // const url = new URL('../../assets/vox/ephtracy/monument/monu16.vox?raw', import.meta.url);
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

  const ambient: number = 0;
  // const ambient: number = 0.1;
  // const ambient: number = 0.5;
  // const ambient: number = 1;
  const ambientLightSpectrum: ReadonlyLightSpectrum = vec3_from_values(ambient, ambient, ambient);

  const sunLight = Light.fromRadius([1, 1, 1], 1000);
  mat4_translate(sunLight.matrix, sunLight.matrix, [-1000, -1000, 1000]);
  // mat4_translate(sunLight.matrix, sunLight.matrix, [0, 0, -1000]);

  // const spotLight0 = Light.fromRadius([1, 1, 1], 16);
  // mat4_translate(spotLight0.matrix, spotLight0.matrix, [64.5, 64.5, 64.5]);
  //
  // const spotLight1 = Light.fromRadius([1, 1, 1], 1000);
  // mat4_translate(spotLight1.matrix, spotLight1.matrix, [-2000, -1000, 1000]);
  //
  // const spotLight2 = Light.fromRadius([1, 1, 1], 1000);
  // mat4_translate(spotLight2.matrix, spotLight2.matrix, [-1000, -2000, 1000]);

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
  //   [30, 30, -32],
  //   [30, 30, 0],
  //   [0, -1, 0],
  // );
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
      // spotLight0,
      // spotLight1,
      // spotLight2,
    ],
  });

  /* RENDER */

  const windowSize = 256;

  const renderer = new ImageDataCPURenderer(new ImageData(windowSize, windowSize));

  const ctx: CanvasRenderingContext2D = create_canvas_context(
    renderer.imageData.width,
    renderer.imageData.height,
    2,
  );

  const rot = mat4_rotate_z(mat4_create(), mat4_create(), Math.PI * 0.01);

  const update = (): void => {
    // console.time('render');

    mat4_multiply(sunLight.matrix, rot, sunLight.matrix);

    freeViewMatrix.update();
    mat4_multiply(camera.viewMatrix, freeViewMatrix.matrix, camera.viewMatrix);

    renderer.render(scene);

    // console.timeEnd('render');

    ctx.putImageData(renderer.imageData, 0, 0);
  };

  const startUpdateLoop = () => {
    const unsubscribe = createAnimationFrameLoop(update);

    createEventListener(window, 'keydown', (event: KeyboardEvent): void => {
      if (event.code === 'KeyC' && event.ctrlKey) {
        unsubscribe();
        renderer.clear();
        ctx.putImageData(renderer.imageData, 0, 0);
      }
    });
  };

  const render = () => {
    console.time('render');
    update();
    console.timeEnd('render');
  };

  startUpdateLoop();
  // render();
}

/*--------------------------*/

export async function debugRayTrace() {
  // debugRayTrace1();
  debugRayTrace2();
}
