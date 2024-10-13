export async function load_vox_file_as_uint8_array(url: URL | string): Promise<Uint8Array> {
  return new Uint8Array(await (await fetch(url)).arrayBuffer());
}
