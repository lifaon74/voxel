export type ColorPalette = ArrayLike<number>; // rgb * N

export interface Texture2DApplyPaletteTrait {
  applyPalette(palette: ColorPalette): void;
}
