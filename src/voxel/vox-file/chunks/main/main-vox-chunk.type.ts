import { IUnknownVoxChunk } from '../unknown/unknown-vox-chunk.type';

export interface IMainVoxChunk {
  type: 'main';
  children: IUnknownVoxChunk[];
}
