import { u8, vec3_from_values_u32 } from '@lifaon/math';
import { draw_image_data } from '../image/canvas/draw_image_data';
import { LinearDynamicMemory } from '../memory/shared/dynamic/linear-dynamic-memory';
import { draw_rainbow_cube_into_texture_3d } from '../texture/operations/draw/draw_rainbow_cube_into_texture_3d';
import { new_voxel_material } from '../voxel/material/read-write/new_voxel_material';
import { voxel_octree_side_to_depth } from '../voxel/octree/depth-side/voxel_octree_side_to_depth';
import { new_voxel_octree } from '../voxel/octree/read-write/new_voxel_octree';
import { insert_voxel_material_address_inside_voxel_octree_at_position } from '../voxel/octree/read-write/voxel-material/at-position/insert_voxel_material_address_inside_voxel_octree_at_position';
import { VoxelOctree } from '../voxel/texture-3d/voxel-octree';

function debugVoxel1() {
  const memory = new LinearDynamicMemory(2 ** 30 - 1);

  const redVoxelMaterialAddress = new_voxel_material(memory, 255, 0, 0);
  const greenVoxelMaterialAddress = new_voxel_material(memory, 0, 255, 0);
  const blueVoxelMaterialAddress = new_voxel_material(memory, 0, 0, 255);

  const voxelOctreeDepth = voxel_octree_side_to_depth(4);
  const voxelOctreeAddress = new_voxel_octree(memory, redVoxelMaterialAddress);

  const texture = new VoxelOctree({
    memory,
    address: voxelOctreeAddress,
    depth: voxelOctreeDepth,
  });

  insert_voxel_material_address_inside_voxel_octree_at_position(
    memory,
    voxelOctreeAddress,
    voxelOctreeDepth,
    vec3_from_values_u32(0, 0, 0),
    greenVoxelMaterialAddress,
  );

  insert_voxel_material_address_inside_voxel_octree_at_position(
    memory,
    voxelOctreeAddress,
    voxelOctreeDepth,
    vec3_from_values_u32(2, 2, 0),
    blueVoxelMaterialAddress,
  );

  memory.print();

  draw_image_data(texture.toImageData(), 4);
}

function debugVoxel2() {
  const memory = new LinearDynamicMemory(2 ** 30 - 1);
  const side: u8 = 16;

  console.time('gen');
  const texture = VoxelOctree.create(side, side, side, memory);
  draw_rainbow_cube_into_texture_3d(texture);
  console.timeEnd('gen');

  memory.print();

  draw_image_data(texture.toImageData(), 4);

  // display_voxel_octree_slice(
  //   buffer,
  //   voxelOctreeAddress,
  //   voxelOctreeDepth,
  //   slice_octree_using_read_voxel(0),
  // );
}

// function debugVoxelCompactMaterials() {
//   const voxelOctreeDepth: number = voxel_octree_side_to_depth(4);
//   // const voxelMaxMemorySize: number = get_maximum_amount_of_memory_used_by_a_voxel_octree_from_depth(voxelOctreeDepth)
//   //   + 1000; // extra for materials
//
//   const buffer = create_bytes_buffer(2 ** 30 - 1);
//   const alloc = create_simple_alloc_function(buffer);
//
//   const redVoxelMaterialAddress = new_voxel_material(memory, 255, 0, 0);
//   const greenVoxelMaterialAddress = new_voxel_material(memory, 0, 255, 0);
//   const blueVoxelMaterialAddress = new_voxel_material(memory, 0, 0, 255);
//
//   const voxelOctreeAddress = new_voxel_octree(memory, NO_MATERIAL);
//
//   const writeVoxel = (x: number, y: number, z: number, voxelMaterialAddress: usize) => {
//     insert_voxel_material_address_inside_voxel_octree_at_position(
//       buffer,
//       alloc,
//       voxelOctreeAddress,
//       voxelOctreeDepth,
//       vec3_from_values_u32(x, y, z),
//       voxelMaterialAddress,
//     );
//   };
//
//   // const readVoxel = (x: number, y: number, z: number) => {
//   //   return readVoxelMaterialAddressOfVoxelOctreeAtPosition(voxel.memory, voxel.address, voxel.depth, x, y, z);
//   // };
//   //
//   const drawDuplicateMaterials = () => {
//     writeVoxel(0, 0, 0, redVoxelMaterialAddress);
//     writeVoxel(0, 1, 0, redVoxelMaterialAddress);
//     writeVoxel(1, 0, 0, greenVoxelMaterialAddress);
//     writeVoxel(2, 0, 0, greenVoxelMaterialAddress);
//     writeVoxel(3, 0, 0, blueVoxelMaterialAddress);
//     writeVoxel(2, 1, 0, blueVoxelMaterialAddress);
//   };
//
//   // const drawUniformMaterials = () => {
//   //   drawUniformRedCubeForOctree(voxel.memory, voxel.address, voxel.depth, alloc);
//   // };
//   //
//   // const drawDuplicateVoxels = () => {
//   //   writeVoxel(0, 0, 0, material1);
//   //   writeVoxel(2, 0, 0, material1);
//   // };
//   //
//   // const drawEmptyCube = () => {
//   //   drawEmptyCubeForOctree(voxel.memory, voxel.address, voxel.depth, alloc, redMaterial.address);
//   // };
//   //
//   // const drawRainbowCube = () => {
//   //   drawRainbowCubeForOctree(voxel.memory, voxel.address, voxel.depth, alloc);
//   // };
//   //
//   // const drawToDebugUnreachableVoxels = () => {
//   //   drawVoxelsToDebugUnreachableVoxels(voxel.memory, voxel.address, voxel.depth, alloc);
//   // };
//
//   drawDuplicateMaterials();
//   // drawUniformMaterials();
//   // drawDuplicateVoxels();
//   // drawEmptyCube();
//   // drawRainbowCube();
//   // drawToDebugUnreachableVoxels();
//
//   print_dynamic_memory(memory);
//   display_voxel_octree_slice(
//     buffer,
//     voxelOctreeAddress,
//     voxelOctreeDepth,
//     slice_octree_using_read_voxel(0),
//   );
//
//   function debugOctreeSize() {
//     const octreeSize: number = get_amount_of_memory_used_by_voxel_octree(
//       buffer,
//       voxelOctreeAddress,
//       new Uint8Array(buffer.byteLength),
//     );
//     console.log('octreeSize', octreeSize);
//   }
//
//   // function debugOctreeCopy() {
//   //   const NEW_MEMORY = new AbstractMemory(2 ** 16);
//   //   const NEW_MEMORY_VIEW = NEW_MEMORY.toUint8Array();
//   //   const alloc = NEW_MEMORY.toAllocFunction();
//   //
//   //   const octrees = cloneVoxelOctreesOnDifferentMemory(
//   //     voxel.memory,
//   //     [voxel],
//   //     NEW_MEMORY_VIEW,
//   //     alloc
//   //   );
//   //
//   //   console.log(octrees);
//   //
//   //   NEW_MEMORY.log('copied');
//   // }
//   //
//   // function debugOctreeCompact() {
//   //   const NEW_MEMORY = new AbstractMemory(MEMORY.bytesUsed);
//   //   const NEW_MEMORY_VIEW = NEW_MEMORY.toUint8Array();
//   //   const newMemoryAlloc = NEW_MEMORY.toAllocFunction();
//   //   CompactVoxelOctreesOnNewMemory(MEMORY_VIEW, [voxel], NEW_MEMORY_VIEW, newMemoryAlloc);
//   //
//   //   NEW_MEMORY.log('compacted memory');
//   // }
//   //
//   // function debugOctreeRemoveUnreachable() {
//   //   console.log('replaced', RemoveUnreachableVoxelsOfVoxelOctree(
//   //     voxel.memory,
//   //     voxel.address,
//   //     alloc,
//   //     voxel.depth,
//   //   ));
//   //   displayVoxelOctreeSlice(voxel, sliceOctreeUsingReadVoxel(2));
//   // }
//
//   debugOctreeSize();
//   // debugOctreeCopy();
//   // debugOctreeCompact();
//   // debugOctreeRemoveUnreachable();
// }

/*--------------------------*/

export async function debugVoxel() {
  // debugVoxel1();
  debugVoxel2();
  // debugVoxelCompactMaterials();
}
