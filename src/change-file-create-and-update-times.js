import { stat, utimes } from 'node:fs/promises';

export async function changeFileCreateAndUpdateTimes(file, dateString) {
  const date = new Date(`${dateString} 12:00:00`);

  const stats = await stat(file);

  if (stats.atime.valueOf() === date.valueOf()) {
    console.log(`Skipping since it's already up to date: ${file}`)
    return;
  }

  console.log('updating');
  console.log({
    file,
    date,
  });
  await utimes(file, date, date);
}