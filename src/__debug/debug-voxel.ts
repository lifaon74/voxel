import { u32, u8, vec3_from_values_u32 } from '@lifaon/math';
import { load_vox_file_url_as_texture_3d } from '../formats/vox-file/load-and-save/load/load_vox_file_url_as_texture_3d';
import { draw_image_data } from '../image/canvas/draw_image_data';
import { LinearDynamicMemory } from '../memory/shared/dynamic/linear-dynamic-memory';
import { draw_rainbow_cube_into_texture_3d } from '../texture/operations/draw/draw_rainbow_cube_into_texture_3d';
import { draw_uniform_cube_into_texture_3d } from '../texture/operations/draw/draw_uniform_cube_into_texture_3d';
import { new_voxel_material } from '../voxel/material/read-write/new_voxel_material';
import { voxel_octree_side_to_depth } from '../voxel/octree/depth-side/voxel_octree_side_to_depth';
import { new_voxel_octree } from '../voxel/octree/read-write/new_voxel_octree';
import { insert_voxel_material_address_inside_voxel_octree_at_position } from '../voxel/octree/read-write/voxel-material/at-position/insert_voxel_material_address_inside_voxel_octree_at_position';
import { deduplicate_voxel_octrees_materials } from '../voxel/optimize/functions/deduplicate_voxel_octrees_materials';
import { simplify_voxel_octree } from '../voxel/optimize/functions/simplify_voxel_octree';
import { append_voxel_octree_in_memory } from '../voxel/optimize/optimize';
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

async function debugVoxel3() {
  const side: u8 = 4;
  const scale: number = 1;

  console.time('gen');
  // const texture = VoxelOctree.create(side, side, side);
  // draw_uniform_cube_into_texture_3d(texture, 255, 0, 0, 255);
  const texture: VoxelOctree<LinearDynamicMemory> = await load_vox_file_url_as_texture_3d<
    VoxelOctree<LinearDynamicMemory>
  >(
    new URL('../../assets/vox/ephtracy/monument/monu6-without-water.vox?raw', import.meta.url),
    VoxelOctree,
  );
  console.timeEnd('gen');

  texture.memory.print();

  // optimize
  console.time('optimize');
  deduplicate_voxel_octrees_materials(texture.memory, [texture.address]);
  // debugger;
  // TODO continue optimization
  simplify_voxel_octree(texture.memory, texture.address);
  console.timeEnd('optimize');
  draw_image_data(texture.toImageData(), scale);

  // move
  {
    const newMemory = new LinearDynamicMemory(2 ** 30 - 1);
    const newVoxelOctreeAddress: u32 = append_voxel_octree_in_memory(
      texture.memory,
      texture.address,
      newMemory,
    );

    const newTexture = new VoxelOctree({
      memory: newMemory,
      address: newVoxelOctreeAddress,
      depth: texture.depth,
    });

    newMemory.print();

    draw_image_data(newTexture.toImageData(), scale);

    console.log('improvement:', newTexture.memory.alloc(0) / texture.memory.alloc(0));
  }
}

/*--------------------------*/

export async function debugVoxel() {
  // debugVoxel1();
  // debugVoxel2();
  debugVoxel3();
}
