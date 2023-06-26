import { errorHandle } from '../helpers/errorHandler.js';
import fs from 'fs';
import path, { resolve as resolvePath } from 'path';

export const cp = async (args) => {
  try {
    const sourceFilePath = args[0];
    const destinationFolderPath = args[1];

    if (!destinationFolderPath) {
      throw new Error();
    }

    const readableStream = fs.createReadStream(resolvePath(sourceFilePath), {
      encoding: 'utf-8',
    });

    return new Promise((resolve, reject) => {
      let data = '';

      readableStream.on('data', (chunk) => {
        data += chunk;
      });

      readableStream.on('end', () => {
        const fileName = path.basename(sourceFilePath);
        const destinationFilePath = resolvePath(
          destinationFolderPath,
          fileName,
        );
        const writableStream = fs.createWriteStream(destinationFilePath);

        writableStream.end(data);

        writableStream.on('finish', () => {
          console.log(`File copied to ${destinationFolderPath}`);
          resolve();
        });

        writableStream.on('error', (error) => {
          reject(error);
        });
      });

      readableStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    errorHandle();
  }
};
