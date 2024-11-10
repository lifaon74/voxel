import { u32, u8 } from '@lifaon/math';
import { mixin, NEW } from '@lifaon/traits';
import { TextureColor } from '../types/texture-color';
import { Texture2DFactoryFromImageBitmapImplementationUsingFromImageData } from './factory/implementations/generic/texture-2d-factory-from-image-bitmap-implementation-using-from-image-data.implementation';
import { Texture2DFactoryFromImageBitmapSourceImplementationUsingFromImageBitmap } from './factory/implementations/generic/texture-2d-factory-from-image-bitmap-source-implementation-using-from-image-bitmap.implementation';
import { Texture2DFactoryFromUrlImplementationUsingFromImageBitmapSource } from './factory/implementations/generic/texture-2d-factory-from-url-implementation-using-from-image-bitmap-source.implementation';
import { Texture2DApplyPaletteImplementationUsingSizeAndGetColorAndSetColor } from './implementations/generic/texture-2d.apply-palette.implementation.using-size-and-get-color-and-set-color';
import { Texture2DReduceColorDepthImplementationUsingSizeAndGetColorAndSetColor } from './implementations/generic/texture-2d.reduce-color-depth.implementation.using-size-and-get-color-and-set-color';
import { Texture2DCropTrait } from './traits/methods/texture-2d.crop.trait';
import { Texture2DGetColorTrait } from './traits/methods/texture-2d.get-color.trait';
import { Texture2DSetColorTrait } from './traits/methods/texture-2d.set-color.trait';
import { Texture2DToImageDataTrait } from './traits/methods/texture-2d.to-image-data.trait';
import { Texture2DSizeTrait } from './traits/properties/texture-2d.size.trait';
import { Texture2DNewTrait } from './traits/well-known/texture-2d.new.trait';

export class Texture2D
  extends mixin<
    [
      Texture2DReduceColorDepthImplementationUsingSizeAndGetColorAndSetColor,
      Texture2DApplyPaletteImplementationUsingSizeAndGetColorAndSetColor,
    ],
    [
      Texture2DFactoryFromImageBitmapImplementationUsingFromImageData<Texture2D>,
      Texture2DFactoryFromImageBitmapSourceImplementationUsingFromImageBitmap<Texture2D>,
      Texture2DFactoryFromUrlImplementationUsingFromImageBitmapSource<Texture2D>,
    ]
  >(
    [
      Texture2DReduceColorDepthImplementationUsingSizeAndGetColorAndSetColor,
      Texture2DApplyPaletteImplementationUsingSizeAndGetColorAndSetColor,
    ],
    [
      Texture2DFactoryFromImageBitmapImplementationUsingFromImageData,
      Texture2DFactoryFromImageBitmapSourceImplementationUsingFromImageBitmap,
      Texture2DFactoryFromUrlImplementationUsingFromImageBitmapSource,
    ],
  )
  implements
    Texture2DSizeTrait,
    Texture2DGetColorTrait,
    Texture2DSetColorTrait,
    Texture2DNewTrait<Texture2D>,
    Texture2DCropTrait<Texture2D>,
    Texture2DToImageDataTrait
{
  static create(x: u32, y: u32): Texture2D {
    return new Texture2D(x, y);
  }

  static fromImageData(imageData: ImageData): Texture2D {
    return new Texture2D(imageData.width, imageData.height, imageData.data);
  }

  readonly x: u32;
  readonly y: u32;
  readonly data: Uint8ClampedArray;

  constructor(x: u32, y: u32, data?: Uint8ClampedArray) {
    const bytesLength: u32 = x * y * 4;
    if (data === undefined) {
      data = new Uint8ClampedArray(bytesLength);
    } else if (data.length !== bytesLength) {
      throw new Error("Data size doesn't match x, y size.");
    }
    super();
    this.x = x;
    this.y = y;
    this.data = data;
  }

  setColor(
    // position
    x: u32,
    y: u32,
    // color
    r: u8,
    g: u8,
    b: u8,
    a: u8,
  ): void {
    const index: u32 = this.getIndexFromPosition(x, y);
    this.data[index] = r;
    this.data[index + 1] = g;
    this.data[index + 2] = b;
    this.data[index + 3] = a;
  }

  getColor(x: u32, y: u32): TextureColor {
    const index: u32 = this.getIndexFromPosition(x, y);
    return [this.data[index], this.data[index + 1], this.data[index + 2], this.data[index + 3]];
  }

  getIndexFromPosition(x: u32, y: u32): u32 {
    return (x + y * this.x) * 4;
  }

  [NEW](x: u32, y: u32): Texture2D {
    return Texture2D.create(x, y);
  }

  crop(px: u32, py: u32, sx: u32, sy: u32): Texture2D {
    const output: Texture2D = new Texture2D(sx, sy);

    const thisIndexIncrement: u32 = (this.x - sx) * 4;
    let thisIndex: u32 = (px + py * this.x) * 4;
    let outputIndex: u32 = 0;

    for (let _y: u32 = 0; _y < sy; _y++, thisIndex += thisIndexIncrement) {
      for (let _x: u32 = 0; _x < sx; _x++, outputIndex += 4, thisIndex += 4) {
        output.data[outputIndex] = this.data[thisIndex];
        output.data[outputIndex + 1] = this.data[thisIndex + 1];
        output.data[outputIndex + 2] = this.data[thisIndex + 2];
        output.data[outputIndex + 3] = this.data[thisIndex + 3];
      }
    }

    return output;
  }

  toImageData(): ImageData {
    return new ImageData(this.data, this.x, this.y);
  }
}
