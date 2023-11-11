import { IMainVoxChunk } from '../main/main-vox-chunk.type';
import { IRGBAVoxChunk } from '../rgba/rgba-vox-chunk.type';
import { ISizeVoxChunk } from '../size/size-vox-chunk.type';
import { IXYZIVoxChunk } from '../xyzi/xyzi-vox-chunk.type';
import { IUnsupportedVoxChunk } from '../unsupported/unsupported-vox-chunk.type';
import { IPackVoxChunk } from '../pack/pack-vox-chunk.type';

export type IUnknownVoxChunk =
  | IMainVoxChunk
  | IPackVoxChunk
  | ISizeVoxChunk
  | IXYZIVoxChunk
  | IRGBAVoxChunk
  | IUnsupportedVoxChunk
  ;
