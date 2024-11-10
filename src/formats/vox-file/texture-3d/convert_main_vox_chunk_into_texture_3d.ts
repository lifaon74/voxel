import { u32 } from '@lifaon/math';
import { Texture3DFactoryCreateTrait } from '../../../texture/texture-3d/factory/traits/methods/texture-3d-factory.create.trait';
import { Texture3DSetColorTrait } from '../../../texture/texture-3d/traits/methods/texture-3d.set-color.trait';
import { MainVoxChunk } from '../chunks/main/main-vox-chunk';
import { RGBAVoxChunk } from '../chunks/rgba/rgba-vox-chunk';
import { RGBAVoxColor } from '../chunks/rgba/rgba-vox-color';
import { SizeVoxChunk } from '../chunks/size/size-vox-chunk';
import { UnknownVoxChunk } from '../chunks/unknown/unknown-vox-chunk';
import { XYZIVoxChunk } from '../chunks/xyzi/xyzi-vox-chunk';
import { DEFAULT_VOX_PALETTE } from '../palette/default-vox-palette.constant';

export function convert_main_vox_chunk_into_texture_3d<GTexture3D extends Texture3DSetColorTrait>(
  chunk: MainVoxChunk,
  factory: Texture3DFactoryCreateTrait<GTexture3D>,
  modelIndex: number = 0,
): GTexture3D {
  const getOptionalChunk = <GChunk extends UnknownVoxChunk>(
    type: GChunk['type'],
    index: u32,
  ): GChunk | undefined => {
    return chunk.children.length > index && chunk.children[index].type === type ?
        (chunk.children[index] as GChunk)
      : void 0;
  };

  const getChunk = <GChunk extends UnknownVoxChunk>(type: GChunk['type'], index: u32): GChunk => {
    const chunk: GChunk | undefined = getOptionalChunk<GChunk>(type, index);
    if (chunk === void 0) {
      throw new Error(`Expected ${type} chunk`);
    } else {
      return chunk;
    }
  };

  let numberOfModels: u32;
  let sizeChunkIndex: u32;
  let xyziChunkIndex: u32;
  let rgbaChunkIndex: u32;

  if (chunk.children[0].type === 'pack') {
    numberOfModels = chunk.children[0].numberOfModels;
    sizeChunkIndex = 1 + modelIndex * 2;
    xyziChunkIndex = sizeChunkIndex + 1;
    rgbaChunkIndex = 1 + numberOfModels * 2;
  } else {
    numberOfModels = 1;
    sizeChunkIndex = 0;
    xyziChunkIndex = 1;
    rgbaChunkIndex = 2;
  }

  if (modelIndex >= numberOfModels) {
    throw new Error(`A single model was found`);
  }

  const sizeChunk: SizeVoxChunk = getChunk<SizeVoxChunk>('size', sizeChunkIndex);
  const xyziChunk: XYZIVoxChunk = getChunk<XYZIVoxChunk>('xyzi', xyziChunkIndex);
  const rgbaChunk: RGBAVoxChunk | undefined = getOptionalChunk<RGBAVoxChunk>(
    'rgba',
    rgbaChunkIndex,
  );

  const texture3d: GTexture3D = factory.create(sizeChunk.x, sizeChunk.y, sizeChunk.z);

  const colors: readonly RGBAVoxColor[] =
    rgbaChunk === void 0 ? DEFAULT_VOX_PALETTE : rgbaChunk.colors;

  for (let j = 0; j < xyziChunk.voxels.length; j++) {
    const { x, y, z, i } = xyziChunk.voxels[j];
    const { r, g, b, a } = colors[i - 1];
    texture3d.setColor(x, y, z, r, g, b, a);
  }

  return texture3d;
}
