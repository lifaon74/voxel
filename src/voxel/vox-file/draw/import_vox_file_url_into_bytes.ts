export function import_vox_file_url_into_bytes(
  url: URL | string,
): Promise<Uint8Array> {
  return fetch(url)
    .then((response: Response): Promise<ArrayBuffer> => {
      return response.arrayBuffer();
    })
    .then((buffer: ArrayBuffer): Uint8Array => {
      return new Uint8Array(buffer);
    });
}
