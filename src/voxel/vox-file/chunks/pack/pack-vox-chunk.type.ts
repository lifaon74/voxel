import { u32 } from '@lifaon/math';

export interface IPackVoxChunk {
  readonly type: 'pack';
  readonly numberOfModels: u32;
}
