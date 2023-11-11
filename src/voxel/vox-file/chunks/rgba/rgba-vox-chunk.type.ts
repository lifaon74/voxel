import { IRGBAVoxColor } from './rgba-vox-color.type';

export interface IRGBAVoxChunk {
  readonly type: 'rgba';
  readonly colors: readonly IRGBAVoxColor[];
}
