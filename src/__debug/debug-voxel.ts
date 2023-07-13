import { vec3_from_values_u32 } from '@lifaon/math';
import { display_voxel_octree_slice } from '../draw-voxels/display_voxel_octree_slice';
import { slice_octree_using_read_voxel } from '../draw-voxels/slice/slice_octree_using_read_voxel';
import { allocate_and_write_voxel_material_in_memory } from '../voxel/material/functions/allocate/allocate_and_write_voxel_material_in_memory';
import { create_memory_alloc_function } from '../voxel/memory/functions/alloc/create_memory_alloc_function';
import { create_memory_from_size } from '../voxel/memory/functions/create/create_memory_from_size';
import { print_dynamic_memory } from '../voxel/memory/functions/print/print_dynamic_memory';
import { IMemoryAddress } from '../voxel/memory/types/memory-address.type';
import { allocate_and_write_voxel_octree_in_memory } from '../voxel/octree/functions/allocate/allocate_and_write_voxel_octree_in_memory';
import { voxel_octree_side_to_depth } from '../voxel/octree/functions/depth-side/voxel_octree_side_to_depth';
import { get_amount_of_memory_used_by_voxel_octree } from '../voxel/octree/functions/get-used-memory/get_amount_of_memory_used_by_voxel_octree';
import {
  allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position,
} from '../voxel/octree/functions/voxel-material/at-position/allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position';
import { NO_MATERIAL } from '../voxel/octree/special-addresses.constant';
import { generateRainbowVoxelOctree } from './generate/generate-rainbow-voxel-octree';

function debugVoxel1() {
  const memory = create_memory_from_size((2 ** 30) - 1);
  const alloc = create_memory_alloc_function(memory);

  const redVoxelMaterialAddress = allocate_and_write_voxel_material_in_memory(memory, alloc, 255, 0, 0);
  const greenVoxelMaterialAddress = allocate_and_write_voxel_material_in_memory(memory, alloc, 0, 255, 0);
  const blueVoxelMaterialAddress = allocate_and_write_voxel_material_in_memory(memory, alloc, 0, 0, 255);

  const voxelOctreeDepth = voxel_octree_side_to_depth(4);
  const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(memory, alloc, redVoxelMaterialAddress);

  allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
    memory, alloc, voxelOctreeAddress, voxelOctreeDepth, vec3_from_values_u32(0, 0, 0), greenVoxelMaterialAddress,
  );

  allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
    memory, alloc, voxelOctreeAddress, voxelOctreeDepth, vec3_from_values_u32(2, 2, 0), blueVoxelMaterialAddress,
  );

  print_dynamic_memory(memory, alloc);
  display_voxel_octree_slice(memory, voxelOctreeAddress, voxelOctreeDepth, slice_octree_using_read_voxel(0));
}

function debugVoxel2() {
  const memory = create_memory_from_size((2 ** 30) - 1);
  const alloc = create_memory_alloc_function(memory);

  const voxelOctreeDepth = voxel_octree_side_to_depth(16);
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
}

function debugVoxelCompactMaterials() {
  const voxelOctreeDepth: number = voxel_octree_side_to_depth(4);
  // const voxelMaxMemorySize: number = get_maximum_amount_of_memory_used_by_a_voxel_octree_from_depth(voxelOctreeDepth)
  //   + 1000; // extra for materials

  const memory = create_memory_from_size((2 ** 30) - 1);
  const alloc = create_memory_alloc_function(memory);

  const redVoxelMaterialAddress = allocate_and_write_voxel_material_in_memory(memory, alloc, 255, 0, 0);
  const greenVoxelMaterialAddress = allocate_and_write_voxel_material_in_memory(memory, alloc, 0, 255, 0);
  const blueVoxelMaterialAddress = allocate_and_write_voxel_material_in_memory(memory, alloc, 0, 0, 255);

  const voxelOctreeAddress = allocate_and_write_voxel_octree_in_memory(memory, alloc, NO_MATERIAL);

  const writeVoxel = (x: number, y: number, z: number, voxelMaterialAddress: IMemoryAddress) => {
    allocate_and_write_voxel_material_address_in_memory_of_voxel_octree_at_position(
      memory,
      alloc,
      voxelOctreeAddress,
      voxelOctreeDepth,
      vec3_from_values_u32(x, y, z),
      voxelMaterialAddress,
    );
  };

  // const readVoxel = (x: number, y: number, z: number) => {
  //   return readVoxelMaterialAddressOfVoxelOctreeAtPosition(voxel.memory, voxel.address, voxel.depth, x, y, z);
  // };
  //
  const drawDuplicateMaterials = () => {
    writeVoxel(0, 0, 0, redVoxelMaterialAddress);
    writeVoxel(0, 1, 0, redVoxelMaterialAddress);
    writeVoxel(1, 0, 0, greenVoxelMaterialAddress);
    writeVoxel(2, 0, 0, greenVoxelMaterialAddress);
    writeVoxel(3, 0, 0, blueVoxelMaterialAddress);
    writeVoxel(2, 1, 0, blueVoxelMaterialAddress);
  };

  // const drawUniformMaterials = () => {
  //   drawUniformRedCubeForOctree(voxel.memory, voxel.address, voxel.depth, alloc);
  // };
  //
  // const drawDuplicateVoxels = () => {
  //   writeVoxel(0, 0, 0, material1);
  //   writeVoxel(2, 0, 0, material1);
  // };
  //
  // const drawEmptyCube = () => {
  //   drawEmptyCubeForOctree(voxel.memory, voxel.address, voxel.depth, alloc, redMaterial.address);
  // };
  //
  // const drawRainbowCube = () => {
  //   drawRainbowCubeForOctree(voxel.memory, voxel.address, voxel.depth, alloc);
  // };
  //
  // const drawToDebugUnreachableVoxels = () => {
  //   drawVoxelsToDebugUnreachableVoxels(voxel.memory, voxel.address, voxel.depth, alloc);
  // };

  drawDuplicateMaterials();
  // drawUniformMaterials();
  // drawDuplicateVoxels();
  // drawEmptyCube();
  // drawRainbowCube();
  // drawToDebugUnreachableVoxels();

  print_dynamic_memory(memory, alloc);
  display_voxel_octree_slice(memory, voxelOctreeAddress, voxelOctreeDepth, slice_octree_using_read_voxel(0));

  function debugOctreeSize() {
    const octreeSize: number = get_amount_of_memory_used_by_voxel_octree(
      memory,
      voxelOctreeAddress,
      new Uint8Array(memory.byteLength),
    );
    console.log('octreeSize', octreeSize);
  }

  // function debugOctreeCopy() {
  //   const NEW_MEMORY = new AbstractMemory(2 ** 16);
  //   const NEW_MEMORY_VIEW = NEW_MEMORY.toUint8Array();
  //   const alloc = NEW_MEMORY.toAllocFunction();
  //
  //   const octrees = cloneVoxelOctreesOnDifferentMemory(
  //     voxel.memory,
  //     [voxel],
  //     NEW_MEMORY_VIEW,
  //     alloc
  //   );
  //
  //   console.log(octrees);
  //
  //   NEW_MEMORY.log('copied');
  // }
  //
  // function debugOctreeCompact() {
  //   const NEW_MEMORY = new AbstractMemory(MEMORY.bytesUsed);
  //   const NEW_MEMORY_VIEW = NEW_MEMORY.toUint8Array();
  //   const newMemoryAlloc = NEW_MEMORY.toAllocFunction();
  //   CompactVoxelOctreesOnNewMemory(MEMORY_VIEW, [voxel], NEW_MEMORY_VIEW, newMemoryAlloc);
  //
  //   NEW_MEMORY.log('compacted memory');
  // }
  //
  // function debugOctreeRemoveUnreachable() {
  //   console.log('replaced', RemoveUnreachableVoxelsOfVoxelOctree(
  //     voxel.memory,
  //     voxel.address,
  //     alloc,
  //     voxel.depth,
  //   ));
  //   displayVoxelOctreeSlice(voxel, sliceOctreeUsingReadVoxel(2));
  // }

  debugOctreeSize();
  // debugOctreeCopy();
  // debugOctreeCompact();
  // debugOctreeRemoveUnreachable();
}

/*--------------------------*/

export async function debugVoxel() {
  // debugVoxel1();
  debugVoxel2();
  // debugVoxelCompactMaterials();
}
