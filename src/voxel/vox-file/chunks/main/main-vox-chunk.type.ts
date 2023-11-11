import { IUnknownVoxChunk } from '../unknown/unknown-vox-chunk.type';

export interface IMainVoxChunk {
  readonly type: 'main';
  readonly children: readonly IUnknownVoxChunk[];
}
