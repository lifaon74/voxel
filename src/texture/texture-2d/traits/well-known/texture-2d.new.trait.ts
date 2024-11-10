import { u32 } from '@lifaon/math';
import { NewTrait } from '@lifaon/traits';

export type Texture2DNewTrait<GNew> = NewTrait<[x: u32, y: u32], GNew>;
