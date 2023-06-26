import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { errorHandle } from '../helpers/errorHandler.js';

const br = '.br';

export const compress = async (args) => {
  try {
    let pathToFile = resolve(args[0]);
    let newFilename;

    if (!args[1]) {
      newFilename = path.dirname(pathToFile);
    } else {
      newFilename = resolve(args[1]);
    }

    const pathNewFile = resolve(
      newFilename,
      `${path.basename(pathToFile)}${br}`,
    );

    const inputStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });

    const outputStream = fs.createWriteStream(pathNewFile);

    const brotliStream = zlib.createBrotliCompress();

    await pipeline(inputStream, brotliStream, outputStream);

    console.log(`File compressed to "${newFilename}"`);
  } catch (error) {
    errorHandle();
  }
};
