declare global {
  interface ShowSaveFilePickerOptionsType {
    readonly description?: string;
    readonly accept: string;
  }

  interface ShowSaveFilePickerOptions {
    readonly excludeAcceptAllOption?: boolean;
    readonly startIn?: 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos';
    readonly suggestedName?: string;
    readonly types?: readonly ShowSaveFilePickerOptionsType[];
  }
  function showSaveFilePicker(options?: ShowSaveFilePickerOptions): Promise<FileSystemFileHandle>;
}

const supportsFileSystemAccess: boolean =
  'showSaveFilePicker' in window &&
  ((): boolean => {
    try {
      return window.self === window.top;
    } catch {
      return false;
    }
  })();

export interface SaveFileOptions extends ShowSaveFilePickerOptions {
  readonly mode?: 'download' | 'save';
}

export async function saveFile(
  blob: Blob,
  { mode = 'save', ...options }: SaveFileOptions = {},
): Promise<void> {
  if (supportsFileSystemAccess && mode === 'save') {
    try {
      const handle: FileSystemFileHandle = await showSaveFilePicker(options);
      const writable: FileSystemWritableFileStream = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error(err.name, err.message);
      }
      return;
    }
  } else {
    const blobURL: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = blobURL;
    a.download = options?.suggestedName ?? (blob instanceof File ? blob.name : 'unknown.bin');
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    URL.revokeObjectURL(blobURL);
    a.remove();
  }
}

// const windowEvents: readonly string[] = ['focus', 'click', 'keydown']
//
//
// export function trustedContext(ctx: () => void): UndoFunction {
// }
