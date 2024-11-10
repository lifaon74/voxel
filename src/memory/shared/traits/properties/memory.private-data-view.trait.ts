import { PrivateTrait } from '@lifaon/traits';

export interface MemoryPrivateDataView {
  readonly dataView: DataView;
}

export type MemoryPrivateDataViewTrait = PrivateTrait<MemoryPrivateDataView>;
