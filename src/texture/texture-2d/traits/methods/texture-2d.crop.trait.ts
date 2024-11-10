import { u32 } from '@lifaon/math';

export interface Texture2DCropTrait<GReturn> {
  crop(
    // position
    px: u32,
    py: u32,
    // size
    sx: u32,
    sy: u32,
  ): GReturn;
}
