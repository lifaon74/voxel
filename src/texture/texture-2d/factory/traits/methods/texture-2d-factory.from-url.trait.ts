export interface Texture2DFactoryFromUrlTrait<GNew> {
  fromUrl(url: URL | string): Promise<GNew>;
}
