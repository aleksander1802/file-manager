import { errorHandle } from '../helpers/errorHandler.js';
import fs from 'fs/promises';
import path from 'path';

export async function up(currentDir) {
  try {
    let absoluteTargetPath = path.dirname(currentDir);
    const stats = await fs.stat(absoluteTargetPath);

    if (stats.isDirectory()) {
      return absoluteTargetPath;
    }
  } catch (error) {
    errorHandle();
  }
}
