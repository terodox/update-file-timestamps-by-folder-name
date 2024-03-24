import { readDirs } from './read-dirs.js';
import { readFiles } from './read-files.js';
import { changeFileCreateAndUpdateTimes } from './change-file-create-and-update-times.js';
import { basename } from 'node:path';

const iCloudDir = '/Users/andrewdesmarais/Library/Mobile\ Documents/com~apple~CloudDocs/Photos\ 2000-2014';
const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/)

async function main() {
  const dirs = await readDirs(iCloudDir);

  for (const dir of dirs) {
    const folderName = basename(dir);
    if (!dateRegex.test(folderName)) {
      console.log(`Skipping folder because it's not a date: ${folderName}`);
    }
    const dateString = folderName;

    const files = await readFiles(dir);
    for (const file of files) {
      await changeFileCreateAndUpdateTimes(file, dateString);
    }
  }
}

main().then(console.log).catch(console.error);