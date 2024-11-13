import { u32, u8, vec3_from_values_u32 } from '@lifaon/math';
import { mixin } from '@lifaon/traits';
import { Texture3DToImageDataImplementationUsingSizeAndGetColor } from '../../texture/texture-3d/implementations/generic/texture-3d-to-image-data-implementation-using-size-and-get-color.implementation';
import { Texture3DGetColorTrait } from '../../texture/texture-3d/traits/methods/texture-3d.get-color.trait';
import { Texture3DSizeTrait } from '../../texture/texture-3d/traits/properties/texture-3d.size.trait';
import { TextureColor } from '../../texture/types/texture-color';
import { voxel_octree_depth_to_side } from '../octree/depth-side/voxel_octree_depth_to_side';
import {
  read_voxel_material_address_inside_voxel_octree_at_position,
  ReadVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory,
} from '../octree/read-write/voxel-material/at-position/read_voxel_material_address_inside_voxel_octree_at_position';
import { NO_MATERIAL } from '../octree/special-addresses.constant';

export type ReadonlyVoxelMemory = ReadVoxelMaterialAddressInsideVoxelOctreeAtPositionMemory;

export interface ReadonlyVoxelOctreeOptions<GMemory extends ReadonlyVoxelMemory> {
  readonly memory: GMemory;
  readonly address: u32;
  readonly depth: u8;
}

const NO_MATERIAL_COLOR: TextureColor = [0, 0, 0, 0];

export class ReadonlyVoxelOctree<GMemory extends ReadonlyVoxelMemory = ReadonlyVoxelMemory>
  extends mixin<[Texture3DToImageDataImplementationUsingSizeAndGetColor]>([
    Texture3DToImageDataImplementationUsingSizeAndGetColor,
  ])
  implements Texture3DSizeTrait, Texture3DGetColorTrait
{
  static optimize(voxels: ReadonlyVoxelOctree[]): ReadonlyVoxelOctree[] {
    throw 'TOOD';
  }

  readonly x: u32;
  readonly y: u32;
  readonly z: u32;

  readonly memory: GMemory;
  readonly address: u32;
  readonly depth: u8;

  constructor({ memory, address, depth }: ReadonlyVoxelOctreeOptions<GMemory>) {
    super();
    const side: u32 = voxel_octree_depth_to_side(depth);
    this.x = side;
    this.y = side;
    this.z = side;
    this.memory = memory;
    this.address = address;
    this.depth = depth;
  }

  getColor(x: u32, y: u32, z: u32): TextureColor {
    const voxelMaterialAddress: u32 = read_voxel_material_address_inside_voxel_octree_at_position(
      this.memory,
      this.address,
      this.depth,
      vec3_from_values_u32(x, y, z),
    );
    if (voxelMaterialAddress === NO_MATERIAL) {
      return NO_MATERIAL_COLOR;
    } else {
      // return [...read_voxel_material(this.memory, voxelMaterialAddress), 0];
      return [
        this.memory.read_u8(voxelMaterialAddress),
        this.memory.read_u8(voxelMaterialAddress + 1),
        this.memory.read_u8(voxelMaterialAddress + 2),
        0xff,
      ];
    }
  }
}
