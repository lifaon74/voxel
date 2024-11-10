import { u32, u8 } from '@lifaon/math';
import { LinearDynamicMemory } from '../../memory/shared/dynamic/linear-dynamic-memory';
import { Texture3DSetColorTrait } from '../../texture/texture-3d/traits/methods/texture-3d.set-color.trait';
import {
  new_voxel_material,
  NewVoxelMaterialMemory,
} from '../material/read-write/new_voxel_material';
import { voxel_octree_side_to_depth_loose } from '../octree/depth-side/voxel_octree_side_to_depth';
import { new_voxel_octree, NewVoxelOctreeMemory } from '../octree/read-write/new_voxel_octree';
import {
  insert_voxel_material_address_inside_voxel_octree_at_position,
  InsertVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory,
} from '../octree/read-write/voxel-material/at-position/insert_voxel_material_address_inside_voxel_octree_at_position';
import { NO_MATERIAL } from '../octree/special-addresses.constant';
import {
  ReadonlyVoxelMemory,
  ReadonlyVoxelOctree,
  ReadonlyVoxelOctreeOptions,
} from './readonly-voxel-octree';

export type VoxelMemory = ReadonlyVoxelMemory &
  NewVoxelMaterialMemory &
  NewVoxelOctreeMemory &
  InsertVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory;

export interface VoxelOctreeOptions<GMemory extends VoxelMemory>
  extends ReadonlyVoxelOctreeOptions<GMemory> {}

export class VoxelOctree<GMemory extends VoxelMemory = VoxelMemory>
  extends ReadonlyVoxelOctree<GMemory>
  implements Texture3DSetColorTrait
{
  static create(x: u32, y: u32, z: u32): VoxelOctree<LinearDynamicMemory>;
  static create<GMemory extends VoxelMemory>(
    x: u32,
    y: u32,
    z: u32,
    memory: GMemory,
  ): VoxelOctree<GMemory>;
  static create<GMemory extends VoxelMemory>(
    x: u32,
    y: u32,
    z: u32,
    memory: GMemory = new LinearDynamicMemory(2 ** 30 - 1) as any,
  ): VoxelOctree<GMemory> {
    return new VoxelOctree({
      memory,
      address: new_voxel_octree(memory, NO_MATERIAL),
      depth: voxel_octree_side_to_depth_loose(Math.max(x, y, z)),
    });
  }

  setColor(
    // position
    x: u32,
    y: u32,
    z: u32,
    // color
    r: u8,
    g: u8,
    b: u8,
    a: u8,
  ): void {
    const voxelMaterialAddress: u32 =
      a === 255 ? new_voxel_material(this.memory, r, g, b) : NO_MATERIAL;

    insert_voxel_material_address_inside_voxel_octree_at_position(
      this.memory,
      this.address,
      this.depth,
      [x, y, z] as any,
      voxelMaterialAddress,
    );
  }
}
