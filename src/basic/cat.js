import fs from 'fs';
import { resolve } from 'path';

export const cat = async (path) => {
  try {
    const currentPath = resolve(path.toString());

    return new Promise((resolve, reject) => {
      const readableStream = fs.createReadStream(currentPath, {
        encoding: 'utf8',
      });

      let data = '';

      readableStream.on('data', (chunk) => {
        data += chunk;
      });

      readableStream.on('end', () => {
        console.log(`${data}`);
        resolve();
      });

      readableStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
