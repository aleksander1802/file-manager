import fs from 'fs';
import { resolve as resolvePath } from 'path';

export const cp = async (args) => {
  try {
    const readableStream = fs.createReadStream(resolvePath(args[0]), {
      encoding: 'utf-8',
    });
    return new Promise((resolve, reject) => {
      let data = '';
      readableStream.on('data', (chunk) => {
        data += chunk;
      });
      readableStream.on('end', () => {
        const writableStream = fs.createWriteStream(resolvePath(args[1]));
        writableStream.end(data);
        writableStream.on('finish', () => {
          console.log(`File copied to ${args[1]}`);

          resolve();
        });
        writableStream.on('error', (error) => {
          if (error.code === 'ERR_INVALID_ARG_TYPE') {
            reject(`Invalid input`);
          } else {
            reject(`Operation failed`);
          }
        });
      });
      readableStream.on('error', (error) => {
        if (error.code === 'ERR_INVALID_ARG_TYPE') {
          reject(`Invalid input`);
        } else {
          reject(`Operation failed`);
        }
      });
    });
  } catch (error) {
    if (error.code === 'ERR_INVALID_ARG_TYPE') {
      console.error(`Invalid input`);
    } else {
      console.error(error);
    }
  }
};
