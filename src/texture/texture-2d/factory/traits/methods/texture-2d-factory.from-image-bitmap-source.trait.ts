export interface Texture2DFactoryFromImageBitmapSourceTrait<GNew> {
  fromImageBitmapSource(
    source: ImageBitmapSource,
    options?: ImageBitmapOptions | undefined,
  ): Promise<GNew>;
}
