import { ISetVoxelColorFunction } from '../../generate/set-voxel-color-function.type';
import { ISetVoxelSizeFunction } from '../../generate/set-voxel-size-function.type';
import { IMainVoxChunk } from '../chunks/main/main-vox-chunk.type';
import { IRGBAVoxColor } from '../chunks/rgba/rgba-vox-color.type';
import { DEFAULT_VOX_PALETTE } from '../palette/default-vox-palette.constant';
import { IXYZIVoxChunk } from '../chunks/xyzi/xyzi-vox-chunk.type';
import { ISizeVoxChunk } from '../chunks/size/size-vox-chunk.type';
import { IRGBAVoxChunk } from '../chunks/rgba/rgba-vox-chunk.type';
import { IUnknownVoxChunk } from '../chunks/unknown/unknown-vox-chunk.type';
import { u32 } from '@lifaon/math';

export function draw_main_vox_chunk_into_set_voxel_color_function(
  chunk: IMainVoxChunk,
  setVoxelSizeFunction: ISetVoxelSizeFunction,
  setVoxelColorFunction: ISetVoxelColorFunction,
  modelIndex: number = 0,
): void {
  const getOptionalChunk = <GChunk extends IUnknownVoxChunk>(
    type: GChunk['type'],
    index: u32,
  ): GChunk | undefined => {
    return ((chunk.children.length > index) && (chunk.children[index].type === type))
      ? chunk.children[index] as GChunk
      : void 0;
  };

  const getChunk = <GChunk extends IUnknownVoxChunk>(
    type: GChunk['type'],
    index: u32,
  ): GChunk => {
    const chunk: GChunk | undefined = getOptionalChunk<GChunk>(type, index);
    if (chunk === void 0) {
      throw new Error(`Expected ${type} chunk`);
    } else {
      return chunk;
    }
  };

  let numberOfModels: u32;
  let index: u32;

  if (chunk.children[0].type === 'pack') {
    numberOfModels = chunk.children[0].numberOfModels;
    index = 1 + modelIndex * 2;
  } else {
    numberOfModels = 1;
    index = 0;
  }

  if (modelIndex >= numberOfModels) {
    throw new Error(`A single model was found`);
  }

  const sizeChunk: ISizeVoxChunk = getChunk<ISizeVoxChunk>('size', index);
  const xyziChunk: IXYZIVoxChunk = getChunk<IXYZIVoxChunk>('xyzi', index + 1);
  const rgbaChunk: IRGBAVoxChunk | undefined = getOptionalChunk<IRGBAVoxChunk>('rgba', index + 2);

  setVoxelSizeFunction(
    sizeChunk.x,
    sizeChunk.y,
    sizeChunk.z,
  );

  const colors: readonly IRGBAVoxColor[] = (rgbaChunk === void 0)
    ? DEFAULT_VOX_PALETTE
    : rgbaChunk.colors;

  for (let j = 0; j < xyziChunk.voxels.length; j++) {
    const { x, y, z, i } = xyziChunk.voxels[j];
    const { r, g, b, a } = colors[i - 1];
    setVoxelColorFunction(
      x,
      y,
      z,
      r,
      g,
      b,
      a,
    );
  }
}
