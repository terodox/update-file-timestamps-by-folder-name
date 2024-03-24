import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function readDirs(fullPath) {
  const dirContents = await readdir(fullPath, { withFileTypes: true });
  const dirs = dirContents
    .filter(x => x.isDirectory())
    .map(dir => join(dir.path, dir.name));

  return dirs;
}