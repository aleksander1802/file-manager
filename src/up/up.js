import fs from 'fs/promises';
import path, { resolve } from 'path';

export async function up(currentDir) {
  let absoluteTargetPath = resolve(path.dirname(currentDir));

  try {
    const stats = await fs.stat(absoluteTargetPath);

    if (stats.isDirectory()) {
      return absoluteTargetPath;
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
