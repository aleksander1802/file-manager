import { errorHandle } from '../helpers/errorHandler.js';
import fs, { promises as fsPromises } from 'fs';
import path, { resolve as resolvePath } from 'path';

export const mv = async (args) => {
  try {
    const sourceFilePath = resolvePath(args[0]);
    const destinationFilePath = resolvePath(args[1]);

    if (!destinationFilePath) {
      throw new Error();
    }

    const readableStream = fs.createReadStream(sourceFilePath, {
      encoding: 'utf-8',
    });

    return new Promise((resolve, reject) => {
      let data = '';
      readableStream.on('data', (chunk) => {
        data += chunk;
      });
      readableStream.on('end', () => {
        const writableStream = fs.createWriteStream(
          resolvePath(destinationFilePath, path.basename(sourceFilePath)),
        );
        writableStream.end(data);

        writableStream.on('finish', async () => {
          await fsPromises.unlink(sourceFilePath);
          console.log(`The file has been moved to ${destinationFilePath}`);

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
