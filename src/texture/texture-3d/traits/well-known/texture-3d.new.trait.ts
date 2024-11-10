import { u32 } from '@lifaon/math';
import { NewTrait } from '@lifaon/traits';

export type Texture3DNewTrait<GNew> = NewTrait<[x: u32, y: u32, z: u32], GNew>;
