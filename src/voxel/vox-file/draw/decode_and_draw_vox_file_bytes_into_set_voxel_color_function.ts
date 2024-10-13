import { ISetVoxelColorFunction } from '../../generate/set-voxel-color-function.type';
import { ISetVoxelSizeFunction } from '../../generate/set-voxel-size-function.type';
import { decode_vox_file } from '../decode_vox_file';
import { draw_main_vox_chunk_into_set_voxel_color_function } from './draw_main_vox_chunk_into_set_voxel_color_function';

export function decode_and_draw_vox_file_bytes_into_set_voxel_color_function(
  bytes: Uint8Array,
  setVoxelSizeFunction: ISetVoxelSizeFunction,
  setVoxelColorFunction: ISetVoxelColorFunction,
): void {
  draw_main_vox_chunk_into_set_voxel_color_function(
    decode_vox_file(bytes),
    setVoxelSizeFunction,
    setVoxelColorFunction,
  );
}
