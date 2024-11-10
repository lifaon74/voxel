import { u32 } from '@lifaon/math';

export interface Texture3DFactoryCreateTrait<GNew> {
  create(x: u32, y: u32, z: u32): GNew;
}
