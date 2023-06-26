import { errorHandle } from '../helpers/errorHandler.js';
import fs from 'fs';
import { resolve } from 'path';

export const add = async (path, currentDir) => {
  try {
    const currentPath = resolve(currentDir, path.toString());

    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(currentPath);
      writableStream.end();

      writableStream.on('finish', () => {
        console.log(`The file has been created ${currentPath}`);
        resolve();
      });

      writableStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    errorHandle();
  }
};
