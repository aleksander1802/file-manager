import path, { resolve } from 'path';
import fs from 'fs/promises';

export const ls = async (currentDir) => {
  let files = await fs.readdir(currentDir);
  

  const results = await Promise.all(files.map(async (fl) => {
    const fileName = resolve(currentDir, fl);
    const stats = await fs.stat(fileName);

    return {
      Name: stats.isDirectory() ? fl : `${fl}${path.extname(fl)}`,
      Type: stats.isDirectory() ? 'directory' : 'file',
    };
  }));

  const sortedList = results.sort((a, b) => {
    if (a.Type === b.Type) {
      return a.Name.localeCompare(b.Name);
    } else if (a.Type === 'directory') {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedList;
};