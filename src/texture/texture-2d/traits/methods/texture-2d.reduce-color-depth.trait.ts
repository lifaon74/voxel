export type ColorDepthBits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Texture2DReduceColorDepthTrait {
  reduceColorDepth(bits: ColorDepthBits): void;
}
