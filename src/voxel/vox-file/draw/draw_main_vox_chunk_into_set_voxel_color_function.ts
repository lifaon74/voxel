import { ISetVoxelColorFunction } from '../../generate/set-voxel-color-function.type';
import { ISetVoxelSizeFunction } from '../../generate/set-voxel-size-function.type';
import { IMainVoxChunk } from '../chunks/main/main-vox-chunk.type';
import { IRGBAVoxColor } from '../chunks/rgba/rgba-vox-color.type';
import { DEFAULT_VOX_PALETTE } from '../palette/default-vox-palette.constant';

export function draw_main_vox_chunk_into_set_voxel_color_function(
  chunk: IMainVoxChunk,
  setVoxelSizeFunction: ISetVoxelSizeFunction,
  setVoxelColorFunction: ISetVoxelColorFunction,
): void {
  const chunk0 = chunk.children[0];
  const chunk1 = chunk.children[1];
  const chunk2 = chunk.children[2];

  if (chunk0.type !== 'size') {
    throw new Error(`Expected SIZE chunk`);
  }

  if (chunk1.type !== 'xyzi') {
    throw new Error(`Expected XYZI chunk`);
  }

  setVoxelSizeFunction(
    chunk0.x,
    chunk0.y,
    chunk0.z,
  );

  const colors: IRGBAVoxColor[] = (chunk2.type === 'rgba')
    ? chunk2.colors
    : DEFAULT_VOX_PALETTE;

  for (let j = 0; j < chunk1.voxels.length; j++) {
    const { x, y, z, i } = chunk1.voxels[j];
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
