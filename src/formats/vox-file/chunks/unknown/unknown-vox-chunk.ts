import { MainVoxChunk } from '../main/main-vox-chunk';
import { MattVoxChunk } from '../matt/matt-vox-chunk';
import { PackVoxChunk } from '../pack/pack-vox-chunk';
import { RGBAVoxChunk } from '../rgba/rgba-vox-chunk';
import { SizeVoxChunk } from '../size/size-vox-chunk';
import { XYZIVoxChunk } from '../xyzi/xyzi-vox-chunk';


export type UnknownVoxChunk =
  | MainVoxChunk
  | PackVoxChunk
  | SizeVoxChunk
  | XYZIVoxChunk
  | RGBAVoxChunk
  | MattVoxChunk
