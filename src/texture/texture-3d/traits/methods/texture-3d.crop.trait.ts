import { u32 } from '@lifaon/math';

export interface Texture3DCropTrait<GReturn> {
  crop(
    // position
    px: u32,
    py: u32,
    pz: u32,
    // size
    sx: u32,
    sy: u32,
    sz: u32,
  ): GReturn;
}
