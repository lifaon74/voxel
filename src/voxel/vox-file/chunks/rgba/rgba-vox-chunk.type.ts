import { IRGBAVoxColor } from './rgba-vox-color.type';

export interface IRGBAVoxChunk {
  type: 'rgba';
  colors: IRGBAVoxColor[];
}
