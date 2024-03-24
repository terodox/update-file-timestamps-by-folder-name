import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function readFiles(fullPath) {
  const dirContents = await readdir(fullPath, { withFileTypes: true });
  const files = dirContents
    .filter(x => !x.isDirectory())
    .map(file => join(file.path, file.name));

  return files;
}