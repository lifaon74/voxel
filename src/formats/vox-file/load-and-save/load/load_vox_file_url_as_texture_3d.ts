import { Texture3DFactoryCreateTrait } from '../../../../texture/texture-3d/factory/traits/methods/texture-3d-factory.create.trait';
import { Texture3DSetColorTrait } from '../../../../texture/texture-3d/traits/methods/texture-3d.set-color.trait';
import { convert_main_vox_chunk_into_texture_3d } from '../../texture-3d/convert_main_vox_chunk_into_texture_3d';
import { load_vox_file_as_vox_chunk } from './load_vox_file_as_vox_chunk';

export async function load_vox_file_url_as_texture_3d<GTexture3D extends Texture3DSetColorTrait>(
  url: URL | string,
  factory: Texture3DFactoryCreateTrait<GTexture3D>,
  modelIndex?: number,
): Promise<GTexture3D> {
  return convert_main_vox_chunk_into_texture_3d<GTexture3D>(
    await load_vox_file_as_vox_chunk(url),
    factory,
    modelIndex,
  );
}
