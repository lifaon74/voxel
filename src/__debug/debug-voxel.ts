import { displayVoxelOctreeSlice } from '../draw-voxels/display-voxel-octree-slice';
import { sliceOctreeUsingReadVoxel } from '../draw-voxels/slice/slice-octree-using-read-voxel';
import { createVoxelMaterial } from '../material/create-voxel-material';
import { createMemoryAllocator } from '../memory/memory-allocator';
import { IMemoryPointer } from '../memory/memory-pointer';
import { memoryAllocatorLog } from '../memory/operations/memory-allocator-log';
import { get_amount_of_memory_used_by_voxel_octree } from '../octree/functions/get-used-memory/get-amount-of-memory-used-by-voxel-octree';
import { get_voxel_octree_depth_from_side } from '../octree/functions/misc/get-voxel-octree-depth-from-side';
import {
  get_maximum_amount_of_memory_used_by_a_voxel_octree_from_depth
} from '../octree/functions/get-used-memory/get-maximum-amount-of-memory-used-by-a-voxel-octree-from-depth';
import {
  write_voxel_octree_material_address_in_memory,
} from '../octree/functions/operations/write-voxel-octree-material-address-in-memory';
import { createVoxelOctree } from '../octree/voxel-octree.type';

function debugVoxel1() {
  const { getBuffer, alloc } = createMemoryAllocator((2 ** 30) - 1);
  const MEMORY = new Uint8Array(getBuffer());

  createVoxelMaterial(MEMORY, alloc, 255, 0, 0);
  createVoxelMaterial(MEMORY, alloc, 0, 255, 0);

  createVoxelOctree(MEMORY, alloc, get_voxel_octree_depth_from_side(2));

  console.log(MEMORY);
}

function debugVoxelCompactMaterials() {
  // displayVoxelMaxMemorySize();

  const voxelDepth: number = get_voxel_octree_depth_from_side(8);
  const voxelMaxMemorySize: number = get_maximum_amount_of_memory_used_by_a_voxel_octree_from_depth(voxelDepth)
    + 1000; // extra for materials

  const memoryAllocator = createMemoryAllocator(voxelMaxMemorySize);
  const { getBuffer, alloc } = memoryAllocator;
  const MEMORY = new Uint8Array(getBuffer());

  const redMaterial = createVoxelMaterial(MEMORY, alloc, 255, 0, 0);
  const material1 = createVoxelMaterial(MEMORY, alloc, 123, 0, 0);
  const material2 = createVoxelMaterial(MEMORY, alloc, 123, 0, 0);
  const material3 = createVoxelMaterial(MEMORY, alloc, 0, 42, 0);
  const material4 = createVoxelMaterial(MEMORY, alloc, 0, 0, 0);

  const voxel = createVoxelOctree(MEMORY, alloc, voxelDepth);

  const writeVoxel = (x: number, y: number, z: number, material: IMemoryPointer) => {
    write_voxel_octree_material_address_in_memory(
      voxel.pointer.memory,
      voxel.pointer.address,
      alloc,
      voxel.depth,
      x,
      y,
      z,
      material.address,
    );
  };

  // const readVoxel = (x: number, y: number, z: number) => {
  //   return readVoxelMaterialAddressOfVoxelOctreeAtPosition(voxel.memory, voxel.address, voxel.depth, x, y, z);
  // };
  //
  const drawDuplicateMaterials = () => {
    writeVoxel(0, 0, 0, material1);
    writeVoxel(0, 1, 0, material1);
    writeVoxel(1, 0, 0, material2);
    writeVoxel(2, 0, 0, material2);
    writeVoxel(3, 0, 0, material3);
    writeVoxel(0, 0, 1, material4);
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


  memoryAllocatorLog(memoryAllocator, 'memory');
  displayVoxelOctreeSlice(voxel, sliceOctreeUsingReadVoxel(0));


  function debugOctreeSize() {
    const octreeSize: number = get_amount_of_memory_used_by_voxel_octree(
      voxel.pointer.memory,
      voxel.pointer.address,
      new Uint8Array(voxel.pointer.memory.length),
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
  debugVoxelCompactMaterials();
}
