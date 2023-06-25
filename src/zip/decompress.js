import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';
import { pipeline } from 'stream/promises';

const br = '.br';

export const decompress = async (args) => {
  try {
    let pathToFile = args[0];
    let newFilepath;

    if (!args[1]) {
      newFilepath = path.dirname(pathToFile);
    } else {
      newFilepath = args[1];
    }

    let newFileName = path.basename(pathToFile);
    if (newFileName.endsWith(br)) {
      newFileName = newFileName.slice(0, -br.length);
    }

    const pathNewFile = path.join(newFilepath, newFileName);

    const inputStream = fs.createReadStream(pathToFile);

    const brotliStream = zlib.createBrotliDecompress();

    const outputStream = fs.createWriteStream(pathNewFile);

    await pipeline(inputStream, brotliStream, outputStream);

    console.log(`File decompressed to "${pathNewFile}"`);
  } catch (err) {
    if (err.code === 'ERR_INVALID_ARG_TYPE') {
      console.error(`Invalid input`);
    } else {
      console.error(`Operation failed`);
    }
  }
};
