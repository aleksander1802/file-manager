import fs, { promises as fsPromises } from 'fs';
import path, { resolve as resolvePath } from 'path';

export const mv = async (args) => {
  try {
    if (!args || args.length < 2) {
      throw new Error('Invalid input');
    }

    const sourceFilePath = resolvePath(args[0]);
    const destinationFilePath = resolvePath(args[1]);

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
      console.error(`Operation failed`);
    }
  }
};
