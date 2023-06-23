import fs from 'fs/promises';
import path, { resolve } from 'path';

export async function cd(currentDir, args) {
  const targetPath = args[0];
  let absoluteTargetPath;

  if (targetPath === '..') {
    absoluteTargetPath = path.dirname(currentDir);
  } else if (/^[a-zA-Z]:$/.test(targetPath)) {
    absoluteTargetPath = resolve(targetPath, '\\');
  } else {
    absoluteTargetPath = resolve(currentDir, targetPath);
  }

  try {
    const stats = await fs.stat(absoluteTargetPath);
    if (stats.isDirectory()) {
      return absoluteTargetPath;
    }
  } catch (error) {
    throw new Error(`Invalid path: ${targetPath}`);
  }
}
