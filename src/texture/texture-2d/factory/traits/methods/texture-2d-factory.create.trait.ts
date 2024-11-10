import { u32 } from '@lifaon/math';

export interface Texture2DFactoryCreateTrait<GNew> {
  create(x: u32, y: u32): GNew;
}
